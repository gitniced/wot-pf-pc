const loginHooks = () => {
    const onFinish = (values: any) => {
        console.log(values)
    }

    return {
        onFinish,
    }
}

export default loginHooks
