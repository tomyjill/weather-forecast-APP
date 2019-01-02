$(document).ready(function(){
	$('#weather').hide()
	if(navigator.geolocation){
		var currentPosition = '';
		navigator.geolocation.getCurrentPosition(function(position){
					//console.log(position)
			currentPosition = position;
			var latitude = currentPosition.coords.latitude;
			var longitude = currentPosition.coords.longitude;
			//console.log(latitude, longitude);
			var url ='http://api.apixu.com/v1/current.json?key=c08298931688470cbf3200114190201&q='
			$.getJSON(url + latitude + ',' + longitude, function(data){
				var data = JSON.stringify(data);
				var json = JSON.parse(data);
				
				var country = json.location.country;
				var name = json.location.name;
				var region = json.location.region;
				
				var temp = json.current.temp_c;
				var temp_f = json.current.temp_f;
				var last_updated = json.current.last_updated.replace('-', '');
				var wind = json.current.wind_kph;
				var humidity = json.current.humidity;
				var time = json.location.localtime.split('')[1];
				var cloud = json.current.cloud;
				
				$('#weather').show();
				$('#weather').html(name + ', ' + region + ', ' + country)
				//console.log(data);
				
				$('#info1').html(time);
				$('#info2').html('Wind ' + wind + ' kph');
				$('#info3').html(temp + '&#8451');
				
				var yes = true;
				$('#switch').on('click', function(){
					if(yes){
						$('#info3').html(temp_f + '&#8457');
						$('#switch').html('Show in Celcius');
						yes = false;
					} else {
						$('#info3').html(temp + '&#8451');
						$('#switch').html('Show in Farenheight');
						yes = true;
					}
				});
			});	
				
		});
	
	}
	
});