export function omit(obj: any, key: string | string[]): any {
    if (typeof key === 'string') {
        const { [key]: _, ...newObj } = obj;
        return newObj;
    } else {
        let newObj: any = {...obj};
        for (const k of key) {
            delete newObj[k];
        }
        return newObj;
    }
}
