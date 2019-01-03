$(document).ready(function(){
	$('.short').hide();
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
				
				if(temp <18){
					$('.grey-jumbo').css({
						backgroundImage:'url(https://cdn.pixabay.com/photo/2018/01/23/12/00/away-3101302__340.jpg)'
					});
					$('#temp').html("<h1>It's a pretty cold day today...<hr></h1>");
				} else if (temp >10 && temp <28){
					$('.grey-jumbo').css({
						backgroundImage:'url(https://cdn.pixabay.com/photo/2017/10/10/07/48/hills-2836301__340.jpg)'
					});
					$('#temp').html("<h1>It's a sunny day today...<hr></h1>");
				} else {
					$('.grey-jumbo').css({
						backgroundImage:'url(https://image.shutterstock.com/image-photo/standalone-trees-during-very-hot-260nw-360422789.jpg)'
					});
					$('#temp').html("<h1>It's a very hot day today...<hr></h1>");
				}

				$('#weather').show();
				$('#weather').html(name + ', ' + region + ', ' + country)
				//console.log(data);
				
				$('#info1').html(time);
				$('#info2').html('Wind ' + wind + ' kph');
				$('#info3').html(temp + '&#8451');
				
				$('.short').show();
				
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
				if(cloud <=30){
						$('#info5').html('Clear sky');
					} else{
						$('#info5').html('Cloudy Sky');
					}
					$('#info6').html('Humidity: ' + humidity + '%');
			
			});	
				
		});
	
	}
	
});