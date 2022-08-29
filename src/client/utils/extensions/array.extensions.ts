/* eslint-disable no-extend-native */
export const chunk = function (this: any[], size: number) {
    const chunks = [];

    while (this.length) {
        chunks.push(this.splice(0, size));
    }

    return chunks;
};

export const remove = function (this: any[], element: any) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return this.filter((e: any) => e !== element);
};

Array.prototype.chunk = chunk;
Array.prototype.remove = remove;
