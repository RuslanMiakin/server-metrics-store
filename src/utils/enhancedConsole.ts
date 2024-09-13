(function () {
    const originalLog = console.log;
    console.log = function (...args) {
        try {
            const err = new Error();
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            const stack = err.stack.split('\n');
            const callerInfo = stack[2].trim();
            const formattedInfo = callerInfo.match(/at (.+):(\d+):\d+|\((.*):(\d+):\d+\)/);
            let location = '';

            if (formattedInfo) {
                const filePath = formattedInfo[1] || formattedInfo[3];
                const lineNumber = formattedInfo[2] || formattedInfo[4];
                if (filePath && lineNumber) {
                    const fileName = filePath.split('/').slice(-2).join('/');
                    const colorStartFilePath = '\x1b[38;5;244m';
                    const colorStartLineNumber = '\x1b[38;5;96m';
                    const colorReset = '\x1b[0m';

                    // Получение текущего времени
                    const now = new Date();
                    const timeString = now.toTimeString().split(' ')[0]; // Время в формате HH:MM:SS

                    // Формирование строки с цветным выводом
                    location = `\n\t${colorStartFilePath}${timeString} .../${fileName}:${colorStartLineNumber}${lineNumber}${colorStartFilePath}${colorReset}\n`;
                }
            }
            originalLog.apply(console, [location, ...args]);
        } catch (e) {
            originalLog.apply(console, args);
        }
    };
})();
