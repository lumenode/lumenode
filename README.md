### Install
- fetch repository
- run `npm i`
- run app with `gulp start` or `npm start` or `node app.js` and u are good to go

### Commands
- `gulp test` -> execute tests with codecoverage
- `gulp tdd` -> run test on file changes
- `gulp runMocha` -> run test single time
- `gulp lint` -> check codestyle with eslint

#### Create new action (create/void/.../remove event/market/selection)
- test XMLGenerator
-- copy it()
-- set expectations (It is VERY(!) important. Set every important field)
-- follow errors
--- create key in XMLGenerator
--- create XML template for action
-- red - green - refactor
-- done.

- test OpenbetPublisher
-- copy it()
-- create expected response from OB
--- with success
--- with error
-- red - green - refactor
-- done.

- test Output
-- create new [action]Spec for [action]Output
-- set expectations
-- red
--- create new [action]Output
--- implement ::map()
--- set whitelist for ::validateStatus()
-- red - green - refactor
-- done.

- test Event (Integration suite)
-- copy it()
-- set expectations
-- red
--- create/implement Event
--- create real/debug MQs
-- red - green - refactor
-- done.


#### Few words about publishing HR (events, markets, selections)
- You should send **only structured data** via RabbitMQ (sport, area, ..., selection)
- You **can not** send ONLY: event or selection

HR responses:
If everything went good you will be received with this sample of data:
```javascript
{
    events: [{
        openbetId: "1849938",
        sparkId: "111111"
    }, {
        openbetId: "1849939",
        sparkId: "111112"
    }],
    markets: [{
        openbetId: "21728593",
        sparkId: "777771"
    }],
    selections: [{
        openbetId: "116498850",
        sparkId: "100000"
    }, {
        openbetId: "116498851",
        sparkId: "200000"
    }, {
        openbetId: "116498852",
        sparkId: "300000"
    }]
}
```

As you can see we got array of *spark* and *openbet* IDs. Map them and you are good to go.

Still there are some moments that OB could probably fail. For example if event already exists or it is not valid -> we will see something like:
```javascript
{
    events: [{
        openbetId: "error",
        sparkId: "111111",
        debug: {
            code: '354',
            message: '{event already exists}',
            humanReadable: 'Event already exists'
        }
    }, {
        openbetId: "error",
        sparkId: "111112",
        debug: {
            code: '354',
            message: '{event already exists}',
            humanReadable: 'Event already exists'
        }
    }],
    markets: [{
        openbetId: "error",
        sparkId: "parent_error",
        debug: {
            code: '150',
            message: '',
            humanReadable: 'Successfully validated XML'
        }
    }],
    selections: [{
        openbetId: "error",
        sparkId: "parent_error",
        debug: {
            code: '150',
            message: '',
            humanReadable: 'Successfully validated XML'
        }
    }, {
        openbetId: "error",
        sparkId: "parent_error",
        debug: {
            code: '150',
            message: '',
            humanReadable: 'Successfully validated XML'
        }
    }, {
        openbetId: "error",
        sparkId: "parent_error",
        debug: {
            code: '150',
            message: '',
            humanReadable: 'Successfully validated XML'
        }
    }]
}
```
Yep, *openbetId* has value of **error**. You could easely handle this.
Still if you look closely you will see notice *parent_error* error. It means that we got error somewhere else on the higher level of hierarchy. 

For example:
- event -> market
- market -> selection
- etc..

Also I will put some other error cases (just in case):
Error on **market** level:
```javascript
{
    events: [{
        openbetId: "1849938",
        sparkId: "111111"
    }, {
        openbetId: "1849939",
        sparkId: "111112"
    }],
    markets: [{
        openbetId: "error",
        sparkId: "777771",
        debug: {
            code: '404',
            message: '{market already exists}',
            humanReadable: 'Market already exists'
        }
    }],
    selections: [{
        openbetId: "error",
        sparkId: "parent_error",
        debug: {
            code: '150',
            message: '',
            humanReadable: 'Successfully validated XML'
        }
    }, {
        openbetId: "error",
        sparkId: "parent_error",
        debug: {
            code: '150',
            message: '',
            humanReadable: 'Successfully validated XML'
        }
    }, {
        openbetId: "error",
        sparkId: "parent_error",
        debug: {
            code: '150',
            message: '',
            humanReadable: 'Successfully validated XML'
        }
    }]
};
```

Error on **selection** level:
```javascript
{
    events: [{
        openbetId: "1850151",
        sparkId: "111111"
    }, {
        openbetId: "1850152",
        sparkId: "111112"
    }],
    markets: [{
        openbetId: "21729734",
        sparkId: "777771"
    }],
    selections: [{
        openbetId: "error",
        sparkId: "9999944444",
        debug: {
            code: '454',
            message: '{selection already exists}',
            humanReadable: 'Selection already exists'
        }
    }, {
        openbetId: "error",
        sparkId: "9999955555",
        debug: {
            code: '454',
            message: '{selection already exists}',
            humanReadable: 'Selection already exists'
        }
    }, {
        openbetId: "error",
        sparkId: "9999966666",
        debug: {
            code: '454',
            message: '{selection already exists}',
            humanReadable: 'Selection already exists'
        }
    }]
}
```

## License

 © [Iurii Krevnyi]()