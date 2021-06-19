import React from 'react';

export class Spinner extends React.Component {
  render() {
    return (
      <div className="card mb-3 mt-3 shadow-sm">
        <div className="card-body">
          <img src="https://i0.wp.com/codemyui.com/wp-content/uploads/2015/09/spinner-loader-animation.gif?fit=880%2C440&ssl=1" />
        </div>
      </div>
    );
  }
}
