<?php

namespace App\Http\Controllers;

use App\EventRecord;
use Illuminate\Http\Request;

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
    * @return Response
    */
    public function createEvent(Request $request)
    {
    	$event = new EventRecord();
    	$event->eventTitle = $request->eventTitle;
    	$event->sessionId = Session::getId();
    	$event->save();
    	
    	return response()->json($event);
    }
}
