import { html, LitElement, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/all/lit-all.min.js'
import { store, connect } from '../store.js'

const MONTHS = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec'
]

class Component extends LitElement {
    static get properties() {
        return {
            previews: { state: true },
            sorting: { state: true },
            search: { state: true },
        
        }
    }

    constructor() {
        super()
        this.disconnectStore = connect((state) => {
            if (this.previews !== state.previews) { this.previews = state.previews }
            if (this.sorting !== state.sorting) { this.sorting = state.sorting }
            if (this.search !== state.search) { this.search = state.search }
        })
        
    }

    static styles = css`
        li {
            border: 1px solid blue;
        }
        /*{
            text-align: center;
            display: flex;
        }
        li .box{
            display: flex;
            flex-direction: column;
            width: 370px;
            height: 300px;
            border: 1px solid rgb(0, 0, 0);
            margin: 10px;
            align-items: center;
            text-align: justify;
            padding: 10px;
            border-radius: 15%;
            background: linear-gradient(to top, darkorange, rgb(0, 0, 0) 50%);
            background-size: 100% 200%;
            transition: all .8s;
        }
        li .box:hover{
            background-position: left bottom;
            color: white;
            border: none;
            box-shadow: 0 0 50px darkorange;
        }
 */
    `;

    render() {
        /**
         * @type {import('../types').preview[]}
         */
        const previews = this.previews

        const filteredPreviews = previews.filter(item => {
            if (!this.search) return true
            return item.title.toLowerCase().includes(this.search.toLowerCase())
        })

        const sortedPreviews = filteredPreviews.sort((a, b) => {
            if (this.sorting === 'a-z') return a.title.localeCompare(b.title)
            if (this.sorting === 'z-a') return a.title.localeCompare(b.title)
            
            const dateA = new Date(a.updated).getTime()
            const dateB = new Date(b.updated).getTime()
            
            if (this.sorting === 'oldest-latest') return dateA - dateB
            if (this.sorting === 'latest-oldest')  return dateB - dateA
            throw new Error('Invalid Sorting')
        })
        
     

        const list = sortedPreviews.map(({ title, id, updated }) => {
            const date = new Date(updated)
            const day = date.getDate().toString().padStart(2, '0')
            const month = MONTHS[date.getMonth() - 1]
            const year = date.getFullYear()

            const clickHandler = () => store.loadSingle(id)

            return html`
                <li>
                    <button @click="${clickHandler}">
                        ${title}
                    </button>
                    <div>${day}/${month}/${year}</div>
                </li>
            `
        })

        return html`
            <h1>Podcast List</h1>
            <podcast-controls></podcast-controls>
            ${list.length > 0 ? html`<ul>${list}</ul>` : html`<div>No matches</div>`}
        `
    }
}

customElements.define('podcast-view-list', Component)