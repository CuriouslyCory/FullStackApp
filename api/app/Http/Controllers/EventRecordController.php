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
    	// I need to come up with a new way to generate a session ID.
    	$event->sessionId = !$request->sessionId ? 'abc123' : $request->sessionId;
    	$event->save();

    	return response()->json($event, 201);
    }
}
