//hello world
const Copy = () => {
    const metadata = {
        kind: 'execute'
    }

    const execute = async (inputs) => {
        console.log('inputs', inputs)
    }

    return {
        metadata,
        execute
    }
}

exports.Copy = Copy