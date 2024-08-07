import { DataType, Table, Column, Model } from 'sequelize-typescript';

@Table({
    tableName: 'campaigns',
    timestamps: true
})
export class CampaignStatistics extends Model {
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true
    })
declare id: number;

    @Column({
        type: DataType.INTEGER,
        defaultValue: 1
    })
    declare user_id: number;

    @Column({
        type: DataType.INTEGER,
        defaultValue: 1
    })
    declare account_id: number;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    declare CampaignName: string;

    @Column({
        type: DataType.DATE,
        allowNull: false
    })
    declare Date: Date;

    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    declare Clicks: number;

    @Column({
        type: DataType.FLOAT,
        allowNull: false
    })
    declare Cost: number;

    @Column({
        type: DataType.FLOAT,
        allowNull: false
    })
    declare Ctr: number;

    @Column({
        type: DataType.FLOAT,
        allowNull: false
    })
    declare AvgCpc: number;

    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    declare Conversions: number;

    @Column({
        type: DataType.FLOAT,
        allowNull: false
    })
    declare CostPerConversion: number;

    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    declare Impressions: number;
}
