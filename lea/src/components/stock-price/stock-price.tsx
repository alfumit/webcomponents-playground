import {Component, h, Prop, State, Watch} from '@stencil/core';
import { STOCK_API_KEY } from '../../../../stock-api-key.js'

interface QuoteResponse {
  'Global Quote': {
    '05. price': number;
  }
}

@Component({
  tag: 'zap-stock-price',
  styleUrl: 'stock-price.css',
  shadow: true
})
export class StockPrice {
  @State() stockPrice: number = 0;
  @State() stockInput: string = '';
  @State() error: string = '';

  @Prop({mutable: true, reflect: true}) stockSymbolProp: string = '';

  @Watch('stockSymbolProp')
  onStockSymbolUpdate(newValue: string, oldValue: string) {
    if(newValue !== oldValue) {
      this.stockInput = newValue;
      this.fetchStockInfo(newValue);
    }
  }

  submitHandler(event: Event) {
    event.preventDefault();
    this.stockSymbolProp = this.stockInput;
  }

  componentWillLoad() {
    this.stockInput = this.stockSymbolProp;
  }

  componentDidLoad() {
    this.fetchStockInfo(this.stockSymbolProp);
  }

  onSymbolInput(event: Event) {
    this.stockInput = (event.target as HTMLInputElement).value;
  }

  private fetchStockInfo(stockSymbol) {
    fetch(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${stockSymbol}&apikey=${STOCK_API_KEY}`)
      .then((res) => res.json())
      .then((res: QuoteResponse) => {
        if (!res['Global Quote']) {
          throw new Error('Invalid symbol entered');
        }
        this.error = null;
        this.stockPrice = +res['Global Quote']['05. price'];
      })
      .catch(err => {
        this.error = err.message;
      })
  }

  render() {
    let stockMessage = <p>Please, enter a valid symbol</p>;
    if(this.stockPrice) {
      stockMessage =  <p>Stock Price is {this.stockPrice}</p>
    } else if(this.error) {
      stockMessage =  <p>{this.error}</p>
    }
    return [
      <form onSubmit={this.submitHandler.bind(this)}>
        <input type="text" id="symbol"
               value={this.stockInput}
               onInput={this.onSymbolInput.bind(this)} />
        <button type="submit">Fetch Data</button>
      </form>,
      <div>{stockMessage}</div>]
  }
}
