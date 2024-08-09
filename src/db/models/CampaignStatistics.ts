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
    declare campaignName: string;

    @Column({
        type: DataType.DATE,
        allowNull: false
    })
    declare date: Date;

    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    declare clicks: number;

    @Column({
        type: DataType.FLOAT,
        allowNull: false
    })
    declare cost: number;

    @Column({
        type: DataType.FLOAT,
        allowNull: false
    })
    declare ctr: number;

    @Column({
        type: DataType.FLOAT,
        allowNull: false
    })
    declare avgCpc: number;

    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    declare conversions: number;

    @Column({
        type: DataType.FLOAT,
        allowNull: false
    })
    declare costPerConversion: number;

    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    declare impressions: number;
}
