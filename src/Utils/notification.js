
export const sendNotification = (props) => {
    try {
        const { deviceToken, title, body } = props;
        if (deviceToken) {
            fetch(
                'https://us-central1-fiverr-staging.cloudfunctions.net/sendChatNotification',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        title: title,
                        deviceToken: deviceToken,
                        body: body,
                    }),
                },
            )
                .then(() => {
                    console.log('success');
                })
                .catch((err) => {
                    console.log('error', err);
                });
        }
    } catch (err) {
        console.log(err, 'ERROR');
    }
};
