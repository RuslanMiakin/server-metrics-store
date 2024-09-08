import { DataType, Table, Column, Model, ForeignKey, BelongsTo, HasMany } from 'sequelize-typescript';
import { User } from './User';
import { CampaignStatistics } from './CampaignStatistics';

@Table({
    tableName: 'market_data',
    timestamps: true
})
export class MarketData extends Model {
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true
    })
    declare marketId: number;

    @ForeignKey(() => User)
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    declare userId: number;

    @BelongsTo(() => User)
    user?: User;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    declare marketName: string;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    declare token: string;

    @HasMany(() => CampaignStatistics)
    campaignStatistics?: CampaignStatistics[];
}
