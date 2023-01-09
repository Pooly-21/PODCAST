import { html, LitElement, css } from'https://cdn.jsdelivr.net/gh/lit/dist@2/all/lit-all.min.js'
import { store , connect } from '../store.js'

class Component extends LitElement{
    static get properties() {
        return {
            sorting: {},
            search: {},
        }
    }
   
    constructor() {
        super()

        const update = 
        
        this.disconnectStore = connectStore((state) => {
            if (this.phase === state.phase) return
            this.phase = state.phase
        })
        
    }

    disconnectedCallback() { this.disconnectStore() }


    render() {

        const changeHandler = event => {
            store.changeSorting(event.target.value)
        }

        const searchHandler = event => {
            store.changeSearch(event.target.value)
        }
        
        return html`
            <div>
                <label>
                    <span>Search</span>
                    <input @change="${searchHandler}" value="${this.search}">
                    <input>
                </label>

                <label>
                    sorting
                    <select @change="${changeHandler}">
                        <option  value="a-z" .selected="${this.sorting === 'a-z'}">A - Z</option>
                        <option value="z-a" .selected="${this.sorting === 'z-a'}">Z - A</option>
                        <option value="oldest-latest" .selected="${this.sorting === 'oldest-latest'}">Oldest - Latest</option>
                        <option value="latest-oldest" .selected="${this.sorting === 'latest-oldest'}">Latest - Oldest</option>
                    </select>
                </label>


            </div>
        ` 
    }
}

customElements.define('podcasts-controls', Component)