<?php

namespace App\Http\Controllers;

use App\EventRecord;
use Illuminate\Http\Request;
use App\Session;

class SessionController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }
    
    /**
     * Return a list of sessions (events grouped by sessionId)
     *
     * @param  Request $request
     * @return Response json object with list of sessions
     */
    public function getSessionList(Request $request)
    {
    	$sessionList = Session::all();
    	return response()->json($sessionList);
    }
    
    /**
     * Return a list of events for a specific session (events grouped by sessionId)
     *
     * @param  Request $request
     * @return Response json object with list of sessions
     */
    public function getEventBySessionId($sessionId)
    {
    	$eventList = EventRecord::where('sessionId', '=' , $sessionId)->get();
    	return response()->json($eventList);
    }

    /**
    * Record an event
    *
    * @param  Request  $request
    * @return Response with the newly created event
    */
    public function createEvent(Request $request)
    {
    	$event = new EventRecord();
    	$event->eventTitle = $request->input('eventTitle');
    	// There are a lot of ways to generate a better session ID, but this works really well and quickly for an app of this scale
    	$event->sessionId = !$request->sessionId ? uniqid('sess_') : $request->sessionId;
    	$event->save();

    	return response()->json($event, 201);
    }
}
