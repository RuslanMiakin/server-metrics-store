interface ReportData {
    [key: string]: string | number;
}

export const parseTSV = (tsv: string): ReportData[] => {
    const lines = tsv.split('\n').filter(line => line.trim() !== '');
    const headers = lines[0].split('\t');
    const data = lines.slice(1).map(line => {
        const values = line.split('\t');
        return headers.reduce((obj: ReportData, header, index) => {
            obj[header] = values[index];
            return obj;
        }, {} as ReportData);
    });
    return data;
};
