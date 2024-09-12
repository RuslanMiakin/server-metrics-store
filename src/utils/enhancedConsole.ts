(function () {
    const originalLog = console.log;
    console.log = function (...args) {
        try {
            const err = new Error();
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            const stack = err.stack.split('\n');
            const callerInfo = stack[2].trim(); // Получаем третью строку стека, где хранится информация о вызове

            const formattedInfo = callerInfo.match(/at (.+):(\d+):\d+|\((.*):(\d+):\d+\)/);
            let location = '';

            if (formattedInfo) {
                const filePath = formattedInfo[1] || formattedInfo[3]; // Обрабатываем оба возможных формата
                const lineNumber = formattedInfo[2] || formattedInfo[4];

                if (filePath && lineNumber) {
                    const fileName = filePath.split('/').slice(-2).join('/'); // Получаем последние два сегмента пути

                    // Устанавливаем цвет пути. Пример: синий цвет текста (ANSI код: 34)
                    const colorStart = '\x1b[34m'; // Начало цветного текста
                    const colorReset = '\x1b[0m';  // Сброс цвета до стандартного

                    location = `\n\t${colorStart}[/${fileName}:${lineNumber}]${colorReset}\n`;
                }
            }
            originalLog.apply(console, [location, ...args]);
        } catch (e) {
            // В случае ошибки, используем оригинальный console.log
            originalLog.apply(console, args);
        }
    };
})();
