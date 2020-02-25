import {Component, h, Listen, Prop, State, Watch} from '@stencil/core';
import { STOCK_API_KEY } from '../../../../stock-api-key.js'

interface QuoteResponse {
  'Global Quote': {
    '05. price': number;
  }
}

@Component({
  tag: 'zap-stock-price',
  styleUrl: 'stock-price.scss',
  shadow: true
})
export class StockPrice {
  @State() stockPrice: number = 0;
  @State() stockInput: string = '';
  @State() error: string = '';
  @State() loading = false;

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

  hostData() {
    return { class:  this.error ? 'error': ''}
  }

  @Listen('zapStockSymbol', {target: 'body'})
  onStockSymbolSelected(event: CustomEvent) {
    if(event && event.detail !== this.stockSymbolProp) {
      this.stockSymbolProp = event.detail;
    }
  }

  private fetchStockInfo(stockSymbol) {
    this.error = null;
    this.stockPrice = null;
    this.loading = true;
    let stockUrl = '';
    if(STOCK_API_KEY) {
      stockUrl = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${stockSymbol}&apikey=${STOCK_API_KEY}`;
    } else {
      stockUrl = `/stockdata?symbol=${stockSymbol}`;
    }

    fetch(stockUrl)
      .then((res) => res.json())
      .then((res: QuoteResponse) => {
        if (!res['Global Quote']) {
          throw new Error('Invalid symbol entered');
        }
        this.stockPrice = +res['Global Quote']['05. price'];
      })
      .catch(err => {
        this.error = err.message;
        this.stockPrice = null;
      })
      .finally(() => {
        this.loading = false;
      })
  }

  render() {
    let stockMessage = <p>Please, enter a valid symbol</p>;
    if(this.stockPrice) {
      stockMessage =  <p>Stock Price is {this.stockPrice}</p>
    } else if(this.error) {
      stockMessage =  <p>{this.error}</p>
    } else if(this.loading) {
      stockMessage = (<zap-spinner></zap-spinner>);
    }
    return [
      <form onSubmit={this.submitHandler.bind(this)}>
        <input type="text" id="symbol"
               value={this.stockInput}
               onInput={this.onSymbolInput.bind(this)} />
        <button type="submit" disabled={this.loading}>Fetch Data</button>
      </form>,
      <div>{stockMessage}</div>]
  }
}
