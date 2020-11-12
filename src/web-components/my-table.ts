import { LitElement, html, css, property, customElement } from 'lit-element';

@customElement('my-table-component')
export class MyTableComponent extends LitElement {
  dataTable: any;
  columnName: any;
  constructor() {
    super();
    this.dataTable = [];
    this.columnName = [];
  }

  static get styles() {
    return css`
    
    .actionDelete:hover,
    .actionEdit:hover {
      text-decoration: underline;
      cursor: pointer;
    }

    .actionDelete {
      color: var(--color-red);
      margin: 0 10px;
    }

    .actionEdit {
      color: var(--color-blue);
    }

    .text-end {
      margin: 20px;
    }

    .add-button {
      float: right;
      border: none;
      font-size: 23px;
      cursor: pointer;
    }

    .text-color {
      color: var(--text-color);
    }




    table {
      border-collapse: collapse;
      width: 100%;
      color: var(--color-black);
    }


    tr:nth-of-type(odd) {
      background: var(--color-Whisper);
    }

    tr:nth-of-type(even) {
      background: var(--tr-nth-even);
    }

    th {
      background: var(--table-header-background);
      color: var(--color-white);
      font-weight: bold;
    }

    td,
    th {
      padding: 15px;
      border-bottom: 1px solid var(--color-light-grey);
      text-align: left;
      font-size: 15px;
      word-break: break-all;
    }

    td>div {
      max-width: 100%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      width: 90%;
    }

    table>td {
      table-layout: fixed;
      width: 50px;
      overflow: hidden;
    }

    @media only screen and (max-width: 600px) {

      table {
        max-width: 100%;
      }

      table,
      thead,
      tbody,
      th,
      td,
      tr {
        display: block;
      }

      thead tr {
        position: absolute;
        top: -9999px;
        left: -9999px;
      }

      tr {
        border: 1px solid #ccc;
      }

      td {
        border: none;
        border-bottom: 1px solid #eee;
        position: relative;
        padding-left: 50%;
      }

      td:before {
        position: absolute;
        top: 6px;
        left: 6px;
        width: 45%;
        padding-right: 10px;
        white-space: nowrap;
        content: attr(data-col);
        color: #000;
        font-weight: bold;
      }

      tr:nth-of-type(odd) {
        background: ghostwhite;
      }

      tr:nth-of-type(even) {
        background: whitesmoke;
      }
    }
    `;
  }

  render() {
    return html`
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
    <table summary="Book information for author, title, website, publisher">
      <thead>
        <tr>
          ${this.columnName.map((header) => html`
          <th scope="col">
            <div>${header.key}</div>
          </th>
          `)}
          <th>Actions</th>
        </tr>

      </thead>
      <tbody>
        ${this.dataTable.map(
      (data) => {
        var disp = html`
            <tr>
              <td data-col="Title">${data.title}</td>
              <td data-col="Author">${data.author}</td>
              <td data-col="Website">${data.website}</td>
              <td data-col="Publisher">${data.publisher}</td>
              <td data-col="Actions">
                <button class="actionEdit" title="Edit" tabindex=0 @click="${() => this.onEdit(data)}"><i
                    class="fa fa-edit" aria-hidden="true"></i></button>
                <button class="actionDelete" title="Delete" tabindex=0 @click="${() => this.onDelete(data)}"><i
                    class="fa fa-trash" aria-hidden="true"></i></button>
              </td>
            </tr>
            `
        return disp;
      }
    )
      }
        </tbody>
        </table>
  `;
  }

  private onEdit(data) {
    this.dispatchEvent(new CustomEvent('edit', {
      detail: {
        editId: data.id
      }
    }));
  }

  private onDelete(data) {
    this.dispatchEvent(new CustomEvent('delete', {
      detail: {
        deleteId: data.id
      }
    }));
  }



  static get properties() {
    return {
      dataTable: { type: Array },
      columnName: { type: Array }
    }
  }
}
