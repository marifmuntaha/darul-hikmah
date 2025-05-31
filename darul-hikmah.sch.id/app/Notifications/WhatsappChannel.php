<?php
namespace App\Notifications;

use Illuminate\Http\Client\ConnectionException;
use Illuminate\Notifications\Notification;

class WhatsappChannel
{

    public function send(object $notifiable, Notification $notification): void
    {
        $message = $notification->toWhatsapp($notifiable);
    }
}
