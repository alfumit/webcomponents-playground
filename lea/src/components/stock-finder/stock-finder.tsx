import {Component, h, State} from '@stencil/core';
import { STOCK_API_KEY } from "../../../../stock-api-key";

@Component({
  tag: 'zap-stock-finder',
  styleUrl: './stock-finder.scss',
  shadow: true
})
export class stockFinder {
  @State() searchName: HTMLInputElement;
  @State() stockOutput: object[];
  @State() loading = false;
  stockListEl: HTMLElement;

  onSearchName(event: Event) {
    event.preventDefault();
    this.loading = true;
    const name = this.searchName.value;
    fetch(`https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${name}&apikey=${STOCK_API_KEY}`)
      .then(res => res.json())
      .then(res => {
        const matches = res['bestMatches'];
        this.stockOutput = matches;
        // @ts-ignore
        this.stockListEl.stockX = this.stockOutput;
        console.log(this.stockOutput)
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => {
      })
  }

  render() {
    return ([
      <form onSubmit={this.onSearchName.bind(this)}>
        <label htmlFor="search-name" >The presumable name of the company:</label>
        <input type="text" id="search-name" ref={el => this.searchName = el} />
        <button type="submit">Find</button>
      </form>,
        <div>
          <zap-stock-list ref={el => this.stockListEl = el}></zap-stock-list>
          {/*          {this.loading ?
            <zap-spinner></zap-spinner> :
            <zap-stock-list ref={el => this.stockListEl = el}></zap-stock-list>
          }*/}
        </div>
      ]
    )
  }
}