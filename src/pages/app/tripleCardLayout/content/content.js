import React, { Component } from 'react';
class Content extends Component {
    state = {  }
    render() { 
        return ( <div className="rounded overflow-hidden custom-shadow   flex-grow bg-white">
        <div className="px-6 py-4">
          <div className="font-bold text-4xl mb-2">Week 1</div>
          <p className="text-gray-700 text-base">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.
          </p>
        </div>
        <div className="px-6 py-4">
          <div className="bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 my-2">#photography</div>
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">#travel</span>
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">#winter</span>
        </div>
      </div> );
    }
}
 
export default Content;