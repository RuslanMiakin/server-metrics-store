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
    declare id: number;

    @ForeignKey(() => User)
    @Column({
        type: DataType.INTEGER,
        defaultValue: 1
    })
    declare user_id: number;

    @BelongsTo(() => User)
    user?: User;

    @ForeignKey(() => MarketData)
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    declare market_data_id: number;

    @BelongsTo(() => MarketData)
    marketData?: MarketData;

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
