const {Marketplace} = require('../models/models')
const fetch  = require('node-fetch')

const {updateMarketContent} = require('./update-service')
const {Op} = require("sequelize");

let updateTable = []


class WorkerService{

    async startWorker() {
        const TODAY_START = new Date()
        TODAY_START.setMinutes(TODAY_START.getHours() - 1);

        const data = await Marketplace.findAll({
            where:{
                updateIsActive : {
                    [Op.is] : true
                },
                updateTime: {
                    [Op.lt]: TODAY_START
                }
            },raw:true})

        let fetches = data.map(async url => await fetch(url["urlAPI"], {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(url["token"])
        }).then(res => res.json()));

        Promise.allSettled(fetches)
            .then((results) => {
                results.forEach((result, num) => {
                    if (result.status === "fulfilled") {
                        if (result.value !== '{not data}') {
                            updateTable.push({marketplaceId: data[num]["id"],data:JSON.stringify(result.value),userId:data[num]["userId"]})
                        }
                    } else if (result.status === "rejected") {
                        console.log(`Failed Calling: \n\treason: ${result.reason}`);
                    }

                });

                updateMarketContent(updateTable)
                updateTable = []

            })
            .catch((err) => {
                console.log(err)
            });
    }
}

module.exports = new WorkerService()
