import React, { useEffect, useState } from "react";
import { GoogleApiWrapper, Map, Marker } from "google-maps-react";
import circle from "../../assets/green-circle.png"

export class MapContainer extends React.Component {
  state = { center: { lat: 37.95, lng: -121.941 }, markers: null };

  clickMarker = (props, markers) => {
    console.log(props.placeId);
  };

  
  
  componentDidMount() {
    var myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhcHBJZCI6ImdsYjUwZWUzb2oiLCJ0b2tlbiI6eyJpdiI6ImFiZjE0MTdjM2NmZTMyY2YwNTQwZjcxZTlmYTg3MDc0IiwiY29udGVudCI6Ijc1NDM0YzFjN2ZlZDg0YTE2ZTIzM2UyMmMwNjZiNDQyN2Q5ZjA0ZWFkNDg0OTM4NTRjNTQ5NDUzNDE1ZTk4MDg5Y2MzZmU2YTJkYWZiM2YzZTY3NTQ1ZmYwNmI4NDAwNGJjZmZlNDU4ZmZkNmVmNDg0MmQzNzIzNTM4ODc2ZWI2ODNiMTBiNDg3MGU4ODRlNDc3OWJjMTA0MTk3ZDkwYmVlYTAxZjFkYzg3MWE3OTg1NjlhZDhhODExYjFjNTgzMjgyMTVmNjg1OWY0NWYyYmQ1YjU0MDgxMGE0NjhjM2MyMGMwMTg5M2ZhZmQxNmQyMTAxZDJjMDE0NWVmMmFkYTVkMThhMDY4NTgzYTBhNzc0ODgxODIyNThhMjc4NDNlYTdjM2VmZWYwMzkwZTVlOTllY2I0OWFhZjg4YWRkN2YyNjU4NDE2YTM4YTczMDBlMjdkY2RlZDdhZWY2NDYwMjMyNTBhN2RjNTZjODlmMTk0OTIzMDkxYTYwODQwOWRlNjQyODFjOTA0MDFmYTE4NzdhMzUxMDI2YzkyMzk0MjQ3OWNjZTVhYjM2ZWQ0NjA3MzcxMzU2ZDY2OGMzZjk5ZjQzMTJiZDVmOWZkZDM1YmE2MDE5OGQ3NmIwODdmOWIyMTZiOGE0ZTdiZWExYzNlOTAyZTVjN2ZjMjI0ZTMzNDA3NmI3MjUyM2EwYzJiNjkyOGU1ZjQ2ZDQxZjg5NDI4YjhlMjMxYzE2NzA0YTllZjg4YjNmN2UzZmQ0MThkZmIwNTA4NzcwM2ViM2FlOGFmNWFhNDg3MTcxODQ2MjYyN2E4NGMxOGY1NmU4ZmEzN2EwY2Q0MjVjNTI1MmM3OGJjOWFjMGUzYzYwOWYxYzU2ODQxOWM5YTY3In0sInNlY3VyaXR5VG9rZW4iOnsiaXYiOiJhYmYxNDE3YzNjZmUzMmNmMDU0MGY3MWU5ZmE4NzA3NCIsImNvbnRlbnQiOiI2MDA5MzM0NTI0ZDk5MTg2NTkyNDFmMDVjZDJmOWUzYjc4OTIwN2ZjY2VhM2E4ODM2Yzc4YTcyOTc5NDJhZDAzYjJkOWQ2Mzg2MmIyZjljMWU4MjQzZGMxIn0sImp0aSI6ImVmOThjNTIxLWQ0NTEtNGYwMi05ZDZmLWYyYzIzZWQyNzQwYyIsImlhdCI6MTcwMTU3MTcwOCwiZXhwIjoxNzAxNTc1MzA4fQ.PJEVCd7K5ceCmh6vQ8hYLs9wetAW8gyUFLNRVRTah9k"  
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
  }
  
  
  render() {
    const { google } = this.props;
  
    console.log('Rendering markers:', this.state.markers);
  
    return (
      <Map
        google={google}
        center={this.state.center}
        style={{ height: "100%", position: "relative", width: "100%" }}
        zoom={16}
      >
        {this.state.markers != null &&
          this.state.markers.map(marker => (
            <Marker
              key={marker.place_id}
              position={marker.position}
              onClick={() => this.clickMarker({ placeId: marker.place_id })}
              icon={{
                url: circle,  // URL of the green circle image
                anchor: new google.maps.Point(16, 16),  // Adjust the anchor point based on the image size
                scaledSize: new google.maps.Size(32, 32),  // Adjust the size of the image
              }}
            />
          ))}
      </Map>
    );
  } 
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyDrcb7m1SF9y8PMHuiC1JzRg2emyaRZJTg"
})(MapContainer);