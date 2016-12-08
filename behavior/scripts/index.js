'use strict'

exports.handle = (client) => {
    // Create steps
    const handleGreeting = client.createStep({
        satisfied() {
            return Boolean(client.getConversationState().helloSent)
        },

        prompt() {
            client.addResponse('greeting')
            client.done()
            client.updateConversationState({
                helloSent: true
            })
        }
    })

    const handleGoodbye = client.createStep({
        satisfied() {
            return false
        },

        prompt() {
            client.addResponse('goodbye')
            client.done()
        }
    })

    const untrained = client.createStep({
        satisfied() {
            return false
        },

        prompt() {
            client.addResponse('apology/untrained')
            client.done()
        }
    })

    const handleEvent = function (eventType, payload) {
        client.addTextResponse('Received event of type: ' + eventType)
        client.done()
    }

    client.runFlow({
        eventHandlers: {
            // '*' Acts as a catch-all and will map all events not included in this
            // object to the assigned function
            '*': handleEvent,
        },
        classifications: {
            // map inbound message classifications to names of streams
            greeting: 'greeting',
            goodbye: 'goodbye'
        },
        autoResponses: {
            // configure responses to be automatically sent as predicted by the machine learning model
        },
        streams: {
            goodbye: handleGoodbye,
            greeting: handleGreeting,
            end: [untrained],
        },
    })
}
