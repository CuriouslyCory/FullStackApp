<?php

namespace App\Http\Controllers;

use App\EventRecord;
use Illuminate\Http\Request;
use App\Providers\Session;

class EventRecordController extends Controller
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
    * Record an event
    *
    * @param  int  $id
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
