import { DataType, Table, Column, Model } from 'sequelize-typescript';

enum Role {
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
    declare id: number;

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
        type: DataType.INTEGER,
        defaultValue: 1
    })
    declare status: number;

    @Column({
        type: DataType.INTEGER,
        defaultValue: Role.ADMIN
    })
    declare role: number;
}
