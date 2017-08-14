<?php 

namespace App;

use Illuminate\Support\Facades\DB;

class Session
{
	
	public static function all()
	{
		
		$sessions = DB::table('event_records')
							->select('sessionId', DB::raw('COUNT(1) as eventCount, MIN(created_at) as sessionStart'))
							->groupBy('sessionId')
							->get();
		return $sessions;
	}
	
}