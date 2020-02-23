import {Component, Event, EventEmitter, h, Prop} from '@stencil/core';
//TODO: create global scss https://stenciljs.com/docs/config#globalstylec
@Component({
  tag: 'zap-stock-list',
  styleUrl: `./stock-list.scss`,
  shadow: true
})
export class StockList {
  @Prop({mutable: true, reflect: true}) stockX: object[];
  @Event({bubbles: true, composed: true}) zapStockSymbol: EventEmitter<string>;

  onSymbolSelected(symbol: string) {
    this.zapStockSymbol.emit(symbol);
  }

  render() {
    const list = this.stockX && this.stockX.map((stockItem) => (
      <li onClick={this.onSymbolSelected.bind(this, stockItem['1. symbol'])}>
        <span>{stockItem['1. symbol']}</span> - <span>{stockItem['2. name']}</span>
      </li>)
    );
    return (
      this.stockX && <ul>{list}</ul>
    )
  }
}
