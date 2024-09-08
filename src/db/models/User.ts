import { DataType, Table, Column, Model, HasMany } from 'sequelize-typescript';
import { MarketData } from './MarketData';

export enum Role {
    ADMIN = 1
}

@Table({
    tableName: 'users',
    timestamps: true
})
export class User extends Model {
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true
    })
    declare userId: number;

    @Column({
        type: DataType.STRING,
        allowNull: false,
        unique: true
    })
    declare email: string;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    declare password: string;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    declare firstName: string;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    declare lastName: string;

    @Column({
        type: DataType.INTEGER,
        defaultValue: 1
    })
    declare status: number;

    @Column({
        type: DataType.INTEGER,
        defaultValue: Role.ADMIN
    })
    declare role: number;

    @HasMany(() => MarketData)
    marketData?: MarketData[];
}
