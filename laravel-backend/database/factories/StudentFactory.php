<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class StudentFactory extends Factory
{
    public function definition(): array
    {
        return [
            'name' => $this->faker->name(),
            'email' => $this->faker->unique()->safeEmail(),
            'course' => $this->faker->randomElement([
                'Full Stack Web Development',
                'Python',
                'Data Science',
                'Advance Excel',
                'Tally Prime',
                'Google Sheets',
                'Java Programming',
                'UI/UX Design',
                'Cybersecurity',
                'Cloud Computing'
            ]),
        ];
    }
}
