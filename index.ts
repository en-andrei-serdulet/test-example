//hello world
export const Copy = ():any => {
    const metadata = {
        kind: 'execute'
    };

    // @ts-ignore
    const execute = async (inputs) => {
        console.log('inputs', inputs);
        return {
            inputs
        }
    };

    return {
        metadata,
        execute
    };
};
