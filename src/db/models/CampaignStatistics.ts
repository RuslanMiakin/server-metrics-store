import { DataType, Table, Column, Model, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { User } from './User';
import { MarketData } from './MarketData';

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
    declare campaignId: number;

    @ForeignKey(() => User)
    @Column({
        type: DataType.INTEGER,
        defaultValue: 1
    })
    declare userId: number;

    @BelongsTo(() => User)
    user?: User;

    @ForeignKey(() => MarketData)
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    declare marketId: number;

    @BelongsTo(() => MarketData)
    marketData?: MarketData;

    @Column({
        type: DataType.INTEGER,
        defaultValue: 1
    })
    declare accountId: number;

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
