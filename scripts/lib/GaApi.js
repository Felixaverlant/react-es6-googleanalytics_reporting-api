let gapi = window.gapi;

function handleAccounts(response) {
    if (response.result.items && response.result.items.length) {
        return response.result;
    } else {
        console.log('No accounts found for this user.');
    }
}

function queryAccounts() {
    return new Promise((resolve) => {
        gapi.client.load('analytics', 'v3').then(() => {
            resolve(gapi.client.analytics.management.accounts.list().then(handleAccounts));
        });
    });
}

function handleProperties(response) {
    if (response.result.items && response.result.items.length) {
        return response.result;
    } else {
        console.log('No properties found for this user.');
    }
}

function queryProperties(account) {
    return new Promise((resolve) => {
        resolve(gapi.client.analytics.management.webproperties.list({'accountId': account.id})
            .then(handleProperties)
            .then(null, (err) => {
                console.log(err);
            })
        );
    });
}

function handleProfiles(response) {

    if (response.result.items && response.result.items.length) {
        return response.result;
    } else {
        console.log('No views (profiles) found for this user.');
    }
}

function queryProfiles(prop) {
    return new Promise((resolve) => {

        //window.setTimeout(() => {
            resolve(
                gapi.client.analytics.management.profiles.list({
                    'accountId': prop.accountId,
                    'webPropertyId': prop.id
                })
                .then(handleProfiles)
                .then(null, (err) => {
                    console.log(err);
                })
            );
         //   , 3000;
       // });
    });
}

export function queryReportingExample(profileId) {
    return new Promise((resolve, reject) => {
        gapi.client.analytics.data.ga.get({
            'ids': 'ga:' + profileId,
            'start-date': '7daysAgo',
            'end-date': 'today',
            'metrics': 'ga:sessions'
        })
        .then((response) => {
            resolve(response);
        })
        .then(null, (err) => {
            reject(err);
            console.log(err);
        });
    });
}

export function authorize() {

    return new Promise((resolve, reject) => {
        let clientId = '356070997844-sn7m6b22dmkf44qmpv08vefrq4aithug.apps.googleusercontent.com';
        let scopes = ['https://www.googleapis.com/auth/analytics.readonly'];

        const authData = {
            client_id: clientId,
            scope: scopes,
            immediate: false
        };

        window.gapi.auth.authorize(authData, response => {

            if (response.error) {
                reject(response.error);
            } else {

                let data = { data: [] };

                queryAccounts().then(accounts => {
                    data.data = accounts;

                    data.data.items.forEach((properties) => {

                        queryProperties(properties).then(prop => {
                            properties.properties = prop;

                            properties.properties.items.forEach((profiles) => {

                                window.setTimeout(() => {
                                    queryProfiles(profiles).then(prof => {
                                        profiles.profiles = prof;
                                    });
                                }, 500);
                            });
                        });
                    });

                    window.setTimeout(() => {
                        resolve(data);
                    }, 4000);
                });
            }
        });
    });
}
