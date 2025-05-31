<?php

namespace App\Notifications;

use Exception;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Http\Client\ConnectionException;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;
use Illuminate\Support\Facades\Http;

class ResetPasswordNotification extends Notification
{
    use Queueable;

    protected string $token;

    /**
     * Create a new notification instance.
     */
    public function __construct($token)
    {
        $this->token = $token;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
//        return ['toWhatsapp'];
        return [WhatsappChannel::class];
    }

    /**
     * Get the mail representation of the notification.
     */
    public function toMail(object $notifiable): MailMessage
    {
        return (new MailMessage)
                    ->line('The introduction to the notification.')
                    ->action('Notification Action', url('/'))
                    ->line('Thank you for using our application!');
    }

    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
    public function toArray(object $notifiable): array
    {
        return [
            //
        ];
    }

    public function toDatabase(object $notifiable): array
    {
        return ['token' => $this->token];
    }

    /**
     * @throws ConnectionException
     */
    public function toWhatsapp(object $notifiable): WhatsappChannel
    {
        Http::post('https://wa-api.limitasi.my.id/message/text?key=portal-ydh', [
            'id' => $notifiable->phone,
            'message' => 'Silahkan ikuti tautan berikut '.config('app.frontend').'/auth/reset-sandi/'.$this->token.' untuk mengatur ulang sandi anda.'
        ]);
        return (new WhatsappChannel);
    }
}
