<?php

namespace App\Console\Commands;

use App\Models\Student;
use Illuminate\Console\Command;
use ZipArchive;

class ImportStudents extends Command
{
    protected $signature = 'students:import';

    protected $description = 'Import students from Indian Students dataset';

    public function handle()
    {
        $zipPath = 'C:\Users\user\Downloads\6e97a134-5488-496d-beed-8a689799afbe.zip';

        $csvName = 'Indian_Students_Data.csv';

        $zip = new ZipArchive;

        if ($zip->open($zipPath) !== true) {
            $this->error('Unable to open ZIP file.');
            return Command::FAILURE;
        }

        $stream = $zip->getStream($csvName);

        if (!$stream) {
            $this->error('CSV file not found inside ZIP.');
            $zip->close();
            return Command::FAILURE;
        }

        $this->info('Reading dataset...');

        // Skip CSV header
        fgetcsv($stream);

        $students = [];
        $seenEmails = [];

        $totalRows = 0;
        $uniqueRows = 0;
        $duplicateRows = 0;

        while (($data = fgetcsv($stream)) !== false) {

            $totalRows++;

            $name = trim($data[2]);
            $course = trim($data[4]);
            $email = trim($data[8]);

            // Skip rows without an email
            if ($email === '') {
                continue;
            }

            // Skip duplicate emails
            if (isset($seenEmails[$email])) {
                $duplicateRows++;
                continue;
            }

            $seenEmails[$email] = true;

            $students[] = [
                'name' => $name,
                'email' => $email,
                'course' => $course,
                'created_at' => now(),
                'updated_at' => now(),
            ];

            $uniqueRows++;

            // Insert in batches
            if (count($students) >= 500) {

                Student::insert($students);

                $students = [];

                $this->info(
                    "Processed {$uniqueRows} unique students..."
                );
            }
        }

        // Insert remaining records
        if (!empty($students)) {
            Student::insert($students);
        }

        fclose($stream);
        $zip->close();

        $this->newLine();

        $this->info("Total CSV rows: {$totalRows}");
        $this->info("Unique students: {$uniqueRows}");
        $this->info("Duplicate rows skipped: {$duplicateRows}");

        $this->info('Import completed successfully.');

        return Command::SUCCESS;
    }
}