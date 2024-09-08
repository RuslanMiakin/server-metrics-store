export class CustomError extends Error {
    public statusCode: number;
    public details: any;

    constructor(statusCode: number, message: string, details?: any) {
        super(message);
        this.statusCode = statusCode;
        this.details = details;
    }

    static badRequest(message: string, details?: any) {
        return new CustomError(400, message, details);
    }
    static unauthorized(message: string, details?: any) {
        return new CustomError(401, message, details);
    }
    static forbidden(message: string, details?: any) {
        return new CustomError(403, message, details);
    }

    static notFound(message: string, details?: any) {
        return new CustomError(404, message, details);
    }

    static internal(message: string, details?: any) {
        return new CustomError(500, message,  details);
    }

    static databaseConnectionError(details?: any) {
        return new CustomError(500, 'Ошибка подключения к базе данных или запуска сервера', details);
    }
}

export default CustomError;
