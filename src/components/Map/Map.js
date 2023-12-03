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
    );
  } 
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyDrcb7m1SF9y8PMHuiC1JzRg2emyaRZJTg"
})(MapContainer);
