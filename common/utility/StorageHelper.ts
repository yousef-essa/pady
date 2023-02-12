export function format(value: string): string {
    return value.replace(" ", "-")
}

export function setItem(key: string, value: object | string) {
    localStorage.setItem(format(key), JSON.stringify(value))
}

export function getItem(key: string): object | undefined {
    if (key === undefined) {
        return undefined
    }

    const value = localStorage.getItem(format(key));
    if (value) {
        return JSON.parse(value)
    }
    return undefined
}