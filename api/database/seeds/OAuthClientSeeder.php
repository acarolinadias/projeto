<?php

use Illuminate\Database\Seeder;

class OAuthClientSeeder extends Seeder {

    public function run(){
        DB::table('oauth_clients')->truncate();
        for ($i=0; $i < 10; $i++){
            DB::table('oauth_clients')->insert(
                [   'id' => "$i",
                    'secret' => "secret$i",
                    'name' => "Test Client $i"
                ]
            );
        }
    }
}

id	int(10) unsigned Auto Increment
user_id	int(11) NULL
name	varchar(255)
secret	varchar(100)
redirect	text
personal_access_client	tinyint(1)
password_client	tinyint(1)
revoked	tinyint(1)
created_at	timestamp NULL
updated_at
