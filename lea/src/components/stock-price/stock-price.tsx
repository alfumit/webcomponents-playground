import { Component, h} from '@stencil/core';

@Component({
  tag: 'zap-stock-price',
  styleUrl: 'stock-price.css',
  shadow: true
})
export class StockPrice {
  submitHandler(event: Event) {
    event.preventDefault();
    console.log('Sub me', event)
  }

  render() {
    return [
      <form onSubmit={this.submitHandler.bind(this)}>
        <input type="text" id="symbol" placeholder="Some symbol, eh"/>
        <button type="submit">Fetch Data</button>
      </form>,
      <div>
        Stock Price is {0}
      </div>]
  }
}
