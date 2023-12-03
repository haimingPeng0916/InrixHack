// import React, { useEffect, useState } from "react";
// import { GoogleApiWrapper, Map, Marker, InfoWindow } from "google-maps-react";
// import circle from "../../assets/green-circle.png"
// import './Map.css';
// import PopUp from '../../components/PopUp/PopUp.js'

// export class MapContainer extends React.Component {
//   state = { center: { lat: 37.95, lng: -121.941 }, markers: null, activeMarker: null, selectedPlace: null, activeRate: null, blockData: null };

//   clickMarker = (props, marker, e) => {
//     this.setState({
//       activeMarker: marker,
//       selectedPlace: props.place_id,
//       activeRate: marker.rate
//     });
//   };

//   closeInfoWindow = () => {
//     this.setState({
//       activeMarker: null,
//       selectedPlace: null,
//       activeRate: null
//     });
//   };

//   // handleLocationSubmit = (location) => {
//   //   const [lat, lng] = location.split(',').map((coord) => parseFloat(coord.trim()));
  
//   //   if (isNaN(lat) || isNaN(lng) || !isFinite(lat) || !isFinite(lng)) {
//   //     return;
//   //   }
  
//   //   this.setState({
//   //     center: { lat, lng },
//   //     showModal: false,
//   //   });
//   // };

//   handleCloseModal = () => {
//     this.setState({ showModal: false });
//   };
  
//   componentDidMount() {
//     const parkingLotUrl =
//       "https://api.iq.inrix.com/lots/v3?point=37.74638779388551%7C-122.42209196090698&radius=3000";
//     const blockDataUrl =
//       "https://api.iq.inrix.com/blocks/v3?point=37.74638779388551%7C-122.42209196090698&radius=1000";

//     const fetchData = (url, stateKey) => {
//       var myHeaders = new Headers();
//       myHeaders.append(
//         "Authorization",
//         "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhcHBJZCI6ImdsYjUwZWUzb2oiLCJ0b2tlbiI6eyJpdiI6IjQyODM4YWQyM2Y0ZTRiOTM3Mjg2ZDFlMGFmZTk1Y2UwIiwiY29udGVudCI6ImNmMDVmN2Q1ODY0MTYwNzc5YWNiZjdlMjA5OGJjOWZhZGY3YjQ1ZWNmMjMwOTA4ZGRlMTY3Nzc5NDI4MGJhMjliMTYzZmM4M2FlNGViOTkzMTFiMTUzMTc4MTNiYjdmOWJjZTNmYjkwNDdiMTQ2NmZiODE2ZWUxMmJhNTNiYjQ3NTZmYWM4NWQzMmI3OTgzYjk2MTAzOGNlZDNmZDY1ZmNhN2EzYzA1ZTI3MWVkZjExM2YxMjJiNDg2YjA5MjJhZDhkN2Q2ZDA1MDVmNTY1ZTIwY2EyYWEzMTM1MDNjODNhN2I3MWE1YzBjZDJkNjc2NzdiMGFkNzVlN2RmYmIwNTc5ZjhhYjQ2MjVjMzMzZDM4M2M1YThmMjcyOGYwNmRlNjU1YTM3ODFjZWIxNjVlOWEwMTk2MGQzMTFiN2RmYmQ5NTVjMWM2OTBlZjA4ZmM1ZjNjZDk2MTA4MmMxMDM1MGI5ODQ4NjcxMmVmYTliODg5YWJiNGI2NzU4ZWRlZmFhNGE2ZjA1YWYwNTE1YzcwMGIzYTU3YzM3N2Y5ZGE1MDVmNGZjYzk3NTgxODE1NGY0YTAzNmZiNzliNTYxYzZkOThkZWEzZmE3MzQxNDE0ZTU4Zjk3YjJhNzFhNjUyZGU5ZjNjNDEzN2VjMDIyOTgwOGFmZmI1NzYwNjRjYjU3OThhNmQyMzM0MzhlMWNkMTViNjU2NjQ4MGE0Y2QxNzcyMjJkMjUzMTE2NjYyNmUwOWIyMDRkMGY0YzNlMTgzOTljYzM2OGFmZWZiOTgzNTY2MmZjY2QxZTdiZDRjNjQzNzIwMzlkODQwNjEwMTUzZDZkZGYwMGFjNDk0MDVlNjMxNjA0OTg1NTM3ZTJlZDdiZDE2YmMxYjBlIn0sInNlY3VyaXR5VG9rZW4iOnsiaXYiOiI0MjgzOGFkMjNmNGU0YjkzNzI4NmQxZTBhZmU5NWNlMCIsImNvbnRlbnQiOiJlYzEwZjJjYzk1NDk2OTMzOTFmMGM3ZjEzYTk4ZGE4NWUxNzA0M2QyY2YzYWE2ZjFmODM2NzQzOTM4YWQ5ZDQwODAwYWY0ZDdjMzczYTNiMjFjOTM1MjI5In0sImp0aSI6ImFhNzdiNjhkLTY5ZjYtNDYyNi1iNGViLTk2YTA3YmRkZDAwMyIsImlhdCI6MTcwMTU4ODMwMCwiZXhwIjoxNzAxNTkxOTAwfQ.AAnj6R3Pz0KnCFRu5TN_s815oWvMdmQk-vOGjQMRlnE"  
//       );

//       var requestOptions = {
//         method: 'GET',
//         headers: myHeaders,
//         redirect: 'follow'
//       };
      
//       fetch(url, requestOptions)
//         .then((response) => {
//           if (!response.ok) {
//             throw new Error(`HTTP error! Status: ${response.status}`);
//           }
//           return response.json();
//         })
//         .then((data) => {
//           if (data && data.result && Array.isArray(data.result)) {
//             const parsedData = data.result.map((item) => ({
//               rate: item.rateCard,
//               place_id: item.id,
//               position: {
//                 lat: item.peps[0].pepPt[1],
//                 lng: item.peps[0].pepPt[0],
//               },
//             }));

//             this.setState({ [stateKey]: parsedData });
//           } else {
//             console.error("Invalid data format:", data);
//           }
//         })
//         .catch((error) => {
//           console.error("Error fetching data:", error.message);
//         });
//     };

//     this.setState({
//       center: { lat: 37.95, lng: -121.941}
//     });

//     fetchData(parkingLotUrl, "markers");
//     fetchData(blockDataUrl, "blockData");
//   }
  
  
//   render() {
//     const { google } = this.props;
//     return (
//       <div>
//         <PopUp showModal={this.state.showModal} handleClose={this.handleCloseModal} handleLocationSubmit={this.handleLocationSubmit} />

//         <div className="map-container">
//           <Map
//             google={google}
//             center={this.state.center}
//             style={{ height: '90%', position: 'relative', width: '100%' }}
//             zoom={16}
//           >
//             {this.state.markers != null &&
//               this.state.markers.map((marker) => (
//                 <Marker
//                   key={marker.place_id}
//                   position={marker.position}
//                   onClick={(props, marker, e) => this.clickMarker(props, marker, e)}
//                   icon={{
//                     url: this.getMarkerIcon(marker.rate), // Determine icon based on availability
//                     anchor: new google.maps.Point(16, 16),
//                     scaledSize: new google.maps.Size(32, 32),
//                   }}
//                 />
//               ))}

//             {this.state.blockData &&
//               this.state.blockData.map((block) => (
//                 <Marker
//                   key={block.place_id}
//                   position={block.position}
//                   onClick={(props, marker, e) => this.clickMarker(props, marker, e)}
//                   icon={{
//                     url: this.getMarkerIcon(block.rate), // Determine icon based on availability
//                     anchor: new google.maps.Point(16, 16),
//                     scaledSize: new google.maps.Size(32, 32),
//                   }}
//                 />
//               ))}
//             <InfoWindow
//               marker={this.state.activeMarker}
//               visible={this.state.activeMarker !== null}
//               onClose={this.closeInfoWindow}
//             >
//               <div>
//                 <h4>{this.state.selectedPlace}</h4>
//                 {this.state.activeMarker && this.state.markers ? (
//                   <div>
//                     <p>Rate Information:</p>
//                     <p>{this.state.markers[0].rate[0]}</p>
//                   </div>
//                 ) : (
//                   <p>Rate information not available</p>
//                 )}
//               </div>
//             </InfoWindow>
//           </Map>

//           <div className="annotation-table">
//             <div className="annotation-row">
//               <div className="circle green"></div>
//               <div>Available</div>
//             </div>
//             <div className="annotation-row">
//               <div className="circle yellow"></div>
//               <div>Almost Filled Up</div>
//             </div>
//             <div className="annotation-row">
//               <div className="circle red"></div>
//               <div>Fully Occupied</div>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }
// }

// export default GoogleApiWrapper({
//   apiKey: "AIzaSyDrcb7m1SF9y8PMHuiC1JzRg2emyaRZJTg"
// })(MapContainer);

import React, { useEffect, useState } from "react";
import { GoogleApiWrapper, Map, Marker, InfoWindow } from "google-maps-react";
import circle from "../../assets/green-circle.png"
import './Map.css';

export class MapContainer extends React.Component {
  state = { center: { lat: 37.95, lng: -121.941 }, markers: null, activeMarker: null, selectedPlace: null, activeRate: null, blockData: null };

  clickMarker = (props, marker, e) => {
    this.setState({
      activeMarker: marker,
      selectedPlace: props.place_id,
      activeRate: marker.rate
    });
  };

  
  
  componentDidMount() {
    var myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhcHBJZCI6ImdsYjUwZWUzb2oiLCJ0b2tlbiI6eyJpdiI6IjVjYzU5NDhiNTUxMjhmMmI3MmNmMjMxOTkwODJkMGMyIiwiY29udGVudCI6IjE1MjRiZGYyZDFiNGQ2YTg5Nzg2NTE3ZTE5M2EwNDA3ZDUxZGIwM2I3YzJmNjJiNTMxOWVhMGM3ZjIwN2QzNzdjYWNmZjFlODk4M2Q4OTRhOTQ1MmE5MDFiM2EzN2JkNDg4Y2UwZWU2ZWIwYjliODRhZDRjZjg3NTdmNGNjMjY2Zjc3ODNhYjI2YjYzMTZiYjViM2MzMTliMDVjNTYwZDMwYjdhYzhhYWYxMTg3NmM0YWNhN2VjYTgyNDM2OWE5OGYwYzdlNTY0ODI5N2I2YzE0ODQ0YWFkYWU2MjE2NTMwNDI0NTM4NzYwYWIyZjVjMTMzZjdhYzVjNzY3ODQ1NWFiYWUxNDMxMjFhNmVhZGFjMDQxNzM1OWJkODEzYmFhMjdhYTE1ODNiYjdhYmYwYTk3ZGMwOGY0ZjM0ODhmY2NiYTAzOGQyYTdmYWE0NjU0Y2Y5NTFjMDQ1ZjU0MDIzOWZhMWVhODU5OGZkYWJmYmRmYTU2ZWE5MzExYjhmYTI3MmI1YjY2Y2MxZDkxOWI0Nzk3NzU1ZWYyMTMwYTA5OWJhMDg1MTUwY2IxOTM1ZTFjZDE0YjI1MGNiOTAwMWVjNjdlNmI5NThlMzNjY2Q0OGY0YzRmOGJkMmRkNzZmNzRhODc3OWY5OGNkOWM0MmM3MWJlMDdkMzAxMzI5M2RlMTg0OWUzZjM0NzlkMjRkMTk4ZjZlOGY1MGQxNzg1M2RkYjNlNTIzNjU1MThhY2FlNzFjZDM4ZjA0ZTk2MjA3NjMzMDlmNmIwMGM1ZTM4MTkwYzQxMDdjNjk0NjNiZjU3MDIzMmEyYTE2Y2U5NzQ3MDIxMThiN2EyNDJjMmM4YjA0NzY0MzJhMjZlOTQ0ODY2NmM0ZjNlMTA5In0sInNlY3VyaXR5VG9rZW4iOnsiaXYiOiI1Y2M1OTQ4YjU1MTI4ZjJiNzJjZjIzMTk5MDgyZDBjMiIsImNvbnRlbnQiOiIxMTI5ODBlYmY2YTFjMWY5OWJkOTJhMGYzZjc5NzUwMmM4NGRiMjdjN2I3MzY1Y2YzMTkwOGU5M2Q5MjI5NzQwYzhkNGY5YjdkZDJjYjkzM2NjN2Y4NjNmIn0sImp0aSI6ImMzODhkYzEzLWEwYTctNGZmZC1iMmEyLTgzNmVmODlhOWJiMSIsImlhdCI6MTcwMTU5MTIzOSwiZXhwIjoxNzAxNTk0ODM5fQ.T7nag2tsPfem-pSoWDNWK-jYbitl-A_KHJN8UmmfdC0"  
    );
  
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };
  
    fetch("https://api.iq.inrix.com/lots/v3?point=37.74638779388551%7C-122.42209196090698&radius=2000", requestOptions)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        if (data && data.result && Array.isArray(data.result)) {  // Check if data.result is an array
          const parsedMarkers = data.result.map(item => ({
            place_id: item.id,
            position: {
              lat: item.peps[0].pepPt[1],
              lng: item.peps[0].pepPt[0],
            }
          }));
  
          this.setState({ markers: parsedMarkers });
        } else {
          console.error('Invalid data format:', data);
        }
      })
      .catch(error => {
        console.error('Error fetching data:', error.message);
      });

    fetch("https://api.iq.inrix.com/blocks/v3?point=37.74304518280319%7C-122.42438793182373&radius=50", requestOptions)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        if (data && data.result && Array.isArray(data.result)) {  // Check if data.result is an array
          const parsedMarkers = data.result.map(item => ({
            place_id: item.id,
            position: {
              lat: item.peps[0].pepPt[1],
              lng: item.peps[0].pepPt[0],
            }
          }));
  
          this.setState({ markers: parsedMarkers });
        } else {
          console.error('Invalid data format:', data);
        }
      })
      .catch(error => {
        console.error('Error fetching data:', error.message);
      });






  }


  
  
  render() {
    const { google } = this.props;
    console.log('Rendering markers:', this.state.markers);
    return (
      <div>
      <Map
        google={google}
        center={this.state.center}
        style={{ height: "90%", position: "relative", width: "100%" }}
        zoom={16}
      >
        {this.state.markers != null &&
          this.state.markers.map(marker => (
            <Marker
              key={marker.place_id}
              position={marker.position}
              onClick={(props, marker, e) => this.clickMarker(props, marker, e)}
              icon={{
                url: circle,  // URL of the green circle image
                anchor: new google.maps.Point(16, 16),  // Adjust the anchor point based on the image size
                scaledSize: new google.maps.Size(32, 32),  // Adjust the size of the image
              }}
              
            />
          ))}

          {this.state.blockData &&
          this.state.blockData.map((block) => (
            <Marker
              key={block.place_id}
              position={block.position}
              onClick={(props, marker, e) => this.clickMarker(props, marker, e)}
              icon={{
                url: circle,
                anchor: new google.maps.Point(16, 16),
                scaledSize: new google.maps.Size(32, 32),
              }}
            />
          ))}
        <InfoWindow
  marker={this.state.activeMarker}
  visible={this.state.activeMarker !== null}
  onClose={this.closeInfoWindow}
>
  <div>
    <h4>{this.state.selectedPlace}</h4>
    {this.state.activeMarker && this.state.markers ? (
      <div>
        <p>Rate Information:</p>
        <p>{this.state.markers[0].rate[0]}</p>
      </div>
    ) : (
      <p>Rate information not available</p>
    )}
  </div>

</InfoWindow>
      </Map>
      <div className="annotation-table">
            <div className="annotation-row">
              <div className="circle green"></div>
              <div>Available</div>
            </div>
            <div className="annotation-row">
              <div className="circle yellow"></div>
              <div>Almost Filled Up</div>
            </div>
            <div className="annotation-row">
              <div className="circle red"></div>
              <div>Fully Occupied</div>
            </div>
          </div>
        </div>
      
    );
  } 
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyDrcb7m1SF9y8PMHuiC1JzRg2emyaRZJTg"
})(MapContainer);