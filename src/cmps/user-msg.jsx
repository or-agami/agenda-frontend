import { Component } from 'react'
import { eventBusService } from '../services/event-bus.service'
import { HiCheck } from 'react-icons/hi'

export class UserMsg extends Component {

    removeEvent

    state = {
        msg: null
    }

    componentDidMount() {
        this.removeEvent = eventBusService.on('show-user-msg', (msg) => {
            this.setState({ msg })
            setTimeout(() => {
                this.setState({ msg: null })
            }, 3000)
        })
    }

    componentWillUnmount() {
        this.removeEvent()
    }

    render() {
        const { msg } = this.state
        if (!msg) return <span></span>
        const msgClass = msg.type || ''
        return (
            <section className={'user-msg ' + msgClass}>
                <HiCheck />
                {this.state.msg.txt}
                <button onClick={() => { this.setState({ msg: null }) }}>
                    X
                </button>
            </section>
        )
    }
}
