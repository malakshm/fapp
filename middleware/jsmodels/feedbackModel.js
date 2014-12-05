
var Ckaizen;
var LOCAL_STORAGE_ENABLED = true;

CKaizen = (function(){
	//CKaizen - top level object
	function CKaizen(){
		this.uid = UUID.generate();
		this.ID = function(){
			return this.uid;
		}
	}
	
	CKaizen.prototype.toString = function(){
		var keys = Object.keys(this);
		var _temp = '';
		for(var i in keys) {
			 if( "undefined" != keys[i]){
			_temp +=  "[" + keys[i] + ":" + this[keys[i]] + ']';
			}
		}
		return _temp;
	};
	CKaizen.prototype.whoamI = function(){
		return this.NAME;
	};
	
	function User(){
		this.firstName = '';
		this.lastName = '';
		return this;
	};


	//Score - 
	function GenericScore(vote,rationale){
		CKaizen.call(this);
		this.vote = vote;
		this.rationale = rationale;
	}
	GenericScore.prototype = Object.create(CKaizen.prototype);

	function Score(vote,rationale){
		GenericScore.call(this,vote,rationale);
	};
	Score.prototype = Object.create(GenericScore.prototype);
	Score.constructor = GenericScore.constructor;

	Score.prototype.setVote = function(vote){
		this.vote = vote;
	};
	Score.prototype.setRationale = function(rationale){
		this.rationale = rationale;
	};



	function displayTime() {
    var str = "";

    var currentTime = new Date()
    var hours = currentTime.getHours()
    var minutes = currentTime.getMinutes()
    var seconds = currentTime.getSeconds()

    if (minutes < 10) {
        minutes = "0" + minutes
    }
    if (seconds < 10) {
        seconds = "0" + seconds
    }
    str += hours + ":" + minutes + ":" + seconds + " ";
    if(hours > 11){
        str += "PM"
    } else {
        str += "AM"
    }
    return str;
	
	}
	//Feedback
	function GenericFeedBackAttribute(name,participateInTrending){
		//CKaizen.call(this);
		this.name = name;
		this.participateInTrending = participateInTrending;

	};
	GenericFeedBackAttribute.prototype = Object.create(CKaizen.prototype);

	function FeedBackAttribute(name,participateInTrending){
		GenericFeedBackAttribute.call(this,name, participateInTrending);
		return this;
	};
	FeedBackAttribute.prototype = Object.create(GenericFeedBackAttribute.prototype);
	FeedBackAttribute.constructor = GenericFeedBackAttribute.constructor;

	//Event
	function GenericEvent(name){
		this.name = name;
		this.dateOfEvent = new Date();
		this.startTime = displayTime();

		this.endTime = displayTime();

	};

	GenericEvent.prototype = Object.create(CKaizen.prototype);

	function ClassEvent(name){
		GenericEvent.call(this,name);
		this.moderator ='';
		this.category ='';
		this.participants =[];
		this.feedBackAttributes =[];
		
		this.setParticipant = function(participant){
			this.participants.push(participant);
		};
		this.setModerator = function(moderator){
    		this.moderator = moderator;
    	};
    	this.setParticipants = function(participants){
    		this.participants = participants;
    	};
    	this.setFeedBackAttributes = function ( fba ){
    		this.fba = fba;
    	};
    	this.setCategory = function(cat){
    		this.category = cat;
    	};
    	return this;
	}
	ClassEvent.prototype = Object.create(GenericEvent.prototype);

	//UserEventScore -- Transactional
	function UserEventScore(){
		CKaizen.call(this);
		this.eventID = '';
		this.scoredUser = '';
		this.attributeID = '';
		this.scoreID = '';
		this.setEventID = function(eventID){
			this.eventID = eventID;
		};
		this.setScoredUser = function(scoredUserID){
			this.scoredUser = scoredUserID;
		};
		this.setAttributeID = function(attributeID){
			this.attributeID = attributeID;
		};
		this.setScore = function(scoreID){
			this.scoreID = scoreID;
		}
	};
	UserEventScore.prototype = Object.create(CKaizen.prototype);


	//Factories --
	function _score(vote,rational){
		var sc = new Score(vote, rational);
		return sc;
	};

	function _feedBackAttribute(name,trend){
		var fa = new FeedBackAttribute(name,trend); 
		return fa;
	};

	CKaizen._classEvent = function(name){
		var e = new ClassEvent(name);
		return e;
	};
	CKaizen._userEventScore = function(){
		var ue = new UserEventScore();
		return ue;
	};

	//Functional Utilities : module CKaizen.Functional
	//Mixin for property sharing
	CKaizen.MIXIN = function( sourceObj, targetObj ){
		for(var key in sourceObj ){
			if(!key in targetObj){
				targetObj[key] = sourceObj[key];
			}
		}
	};
	
	

	CKaizen.listEventsByDate = function( eDate ){
		var eventCollection = [];
		if(LOCAL_STORAGE_ENABLED){

		}
	};

	CKaizen.saveEvent = function(event){
		EventPersister(_getSampleEvent());
	}

	

	function _getSampleFeedbackAttr(){
		var fba = [];
		fba[0] = new FeedBackAttribute('Leadership',	true);
		fba[1] = new FeedBackAttribute('Articulation',	true);
		fba[2] = new FeedBackAttribute('Energy',	true);
		fba[3] = new FeedBackAttribute('Presence',	true);
		//console.log(JSON.stringify(fba));
		return fba;	
	}
	function _getSampleParticipants(){
		var kk = [];
		for(var k = 0; k<5; k++){
			var user = new User();
			user.firstName = 'Magesh' + k;
			user.lastName = 'Lakshmi' + k;
			kk[k] = user;
		}
		return kk;
	}
	function _getSampleEvent(){
		var kk = CKaizen._classEvent('TestEvent');
		kk.setModerator('Magesh');
		kk.setParticipants(_getSampleParticipants());
		kk.setFeedBackAttributes(_getSampleFeedbackAttr());
		kk.setCategory('EDUCATION-PGM');
		return kk;
	}

	function _checkLocalStorage(){
		if('localStorage' in window ){
			return true;
		}
	}
	function EventPersister(event){
		if(LOCAL_STORAGE_ENABLED){
			if(_checkLocalStorage){
				if( event instanceof ClassEvent ){
					localStorage.setItem('MAGESH',JSON.stringify(event));
				}
			
			}
		}else{

		}
	}
	//reference outside
	return CKaizen;
})();







