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
      "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhcHBJZCI6ImdsYjUwZWUzb2oiLCJ0b2tlbiI6eyJpdiI6IjQyODM4YWQyM2Y0ZTRiOTM3Mjg2ZDFlMGFmZTk1Y2UwIiwiY29udGVudCI6ImNmMDVmN2Q1ODY0MTYwNzc5YWNiZjdlMjA5OGJjOWZhZGY3YjQ1ZWNmMjMwOTA4ZGRlMTY3Nzc5NDI4MGJhMjliMTYzZmM4M2FlNGViOTkzMTFiMTUzMTc4MTNiYjdmOWJjZTNmYjkwNDdiMTQ2NmZiODE2ZWUxMmJhNTNiYjQ3NTZmYWM4NWQzMmI3OTgzYjk2MTAzOGNlZDNmZDY1ZmNhN2EzYzA1ZTI3MWVkZjExM2YxMjJiNDg2YjA5MjJhZDhkN2Q2ZDA1MDVmNTY1ZTIwY2EyYWEzMTM1MDNjODNhN2I3MWE1YzBjZDJkNjc2NzdiMGFkNzVlN2RmYmIwNTc5ZjhhYjQ2MjVjMzMzZDM4M2M1YThmMjcyOGYwNmRlNjU1YTM3ODFjZWIxNjVlOWEwMTk2MGQzMTFiN2RmYmQ5NTVjMWM2OTBlZjA4ZmM1ZjNjZDk2MTA4MmMxMDM1MGI5ODQ4NjcxMmVmYTliODg5YWJiNGI2NzU4ZWRlZmFhNGE2ZjA1YWYwNTE1YzcwMGIzYTU3YzM3N2Y5ZGE1MDVmNGZjYzk3NTgxODE1NGY0YTAzNmZiNzliNTYxYzZkOThkZWEzZmE3MzQxNDE0ZTU4Zjk3YjJhNzFhNjUyZGU5ZjNjNDEzN2VjMDIyOTgwOGFmZmI1NzYwNjRjYjU3OThhNmQyMzM0MzhlMWNkMTViNjU2NjQ4MGE0Y2QxNzcyMjJkMjUzMTE2NjYyNmUwOWIyMDRkMGY0YzNlMTgzOTljYzM2OGFmZWZiOTgzNTY2MmZjY2QxZTdiZDRjNjQzNzIwMzlkODQwNjEwMTUzZDZkZGYwMGFjNDk0MDVlNjMxNjA0OTg1NTM3ZTJlZDdiZDE2YmMxYjBlIn0sInNlY3VyaXR5VG9rZW4iOnsiaXYiOiI0MjgzOGFkMjNmNGU0YjkzNzI4NmQxZTBhZmU5NWNlMCIsImNvbnRlbnQiOiJlYzEwZjJjYzk1NDk2OTMzOTFmMGM3ZjEzYTk4ZGE4NWUxNzA0M2QyY2YzYWE2ZjFmODM2NzQzOTM4YWQ5ZDQwODAwYWY0ZDdjMzczYTNiMjFjOTM1MjI5In0sImp0aSI6ImFhNzdiNjhkLTY5ZjYtNDYyNi1iNGViLTk2YTA3YmRkZDAwMyIsImlhdCI6MTcwMTU4ODMwMCwiZXhwIjoxNzAxNTkxOTAwfQ.AAnj6R3Pz0KnCFRu5TN_s815oWvMdmQk-vOGjQMRlnE"  
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