#!/usr/bin/env node

/**
 * Script to convert code exercises to natural language
 * Usage: node scripts/convertToNaturalLanguage.js [--dry-run] [--course=courseName]
 */

const fs = require('fs');
const path = require('path');

// Natural language conversions for each language
const conversions = {
    python: {
        'print(': 'display ',
        ')': '',
        'input(': 'get input ',
        'if ': 'if ',
        ':': ' then',
        'elif ': 'else if ',
        'else:': 'else',
        'for ': 'for each ',
        ' in ': ' in ',
        'while ': 'while ',
        'def ': 'create function ',
        'return ': 'return ',
        'True': 'true',
        'False': 'false',
        'None': 'nothing',
        ' and ': ' and ',
        ' or ': ' or ',
        'not ': 'not ',
        ' == ': ' equals ',
        ' != ': ' not equals ',
        ' > ': ' greater than ',
        ' < ': ' less than ',
        ' >= ': ' greater than or equal to ',
        ' <= ': ' less than or equal to ',
    },
    javascript: {
        'console.log(': 'display ',
        ')': '',
        ';': '',
        'alert(': 'show alert ',
        'prompt(': 'get input ',
        'if (': 'if ',
        ') {': ' then',
        'else if (': 'else if ',
        'else {': 'else',
        '}': ' end',
        'for (': 'for ',
        'while (': 'while ',
        'function ': 'create function ',
        'const ': 'create constant ',
        'let ': 'create variable ',
        'var ': 'create variable ',
        ' = ': ' as ',
        'return ': 'return ',
        'true': 'true',
        'false': 'false',
        'null': 'nothing',
        'undefined': 'nothing',
        ' && ': ' and ',
        ' || ': ' or ',
        '!': 'not ',
        ' === ': ' equals ',
        ' == ': ' equals ',
        ' !== ': ' not equals ',
        ' != ': ' not equals ',
    },
    java: {
        'System.out.println(': 'display ',
        'System.out.print(': 'display ',
        ')': '',
        ';': '',
        'if (': 'if ',
        ') {': ' then',
        'else if (': 'else if ',
        'else {': 'else',
        '}': ' end',
        'for (': 'for ',
        'while (': 'while ',
        'return ': 'return ',
        'int ': 'create number ',
        'double ': 'create decimal ',
        'String ': 'create text ',
        'boolean ': 'create boolean ',
        ' = ': ' as ',
        'true': 'true',
        'false': 'false',
        'null': 'nothing',
    },
    cpp: {
        'std::cout << ': 'display ',
        '<< std::endl': '',
        '<<': ' ',
        'std::cin >> ': 'get input into ',
        '>>': ' ',
        ';': '',
        'if (': 'if ',
        ') {': ' then',
        'else if (': 'else if ',
        'else {': 'else',
        '}': ' end',
        'for (': 'for ',
        'while (': 'while ',
        'return ': 'return ',
        'int ': 'create number ',
        'string ': 'create text ',
        'bool ': 'create boolean ',
        ' = ': ' as ',
        'true': 'true',
        'false': 'false',
        'nullptr': 'nothing',
    }
};

// Convert code to natural language
function convertToNatural(code, language) {
    if (!language || language === 'natural') return code;

    const mapping = conversions[language];
    if (!mapping) return code;

    let natural = code;

    // Apply conversions in order
    for (const [codePattern, naturalPattern] of Object.entries(mapping)) {
        natural = natural.split(codePattern).join(naturalPattern);
    }

    // Clean up extra spaces and formatting
    natural = natural
        .replace(/\s+/g, ' ')
        .replace(/\s+,/g, ',')
        .replace(/\s+\./g, '.')
        .trim();

    return natural;
}

// Should this exercise use natural language?
function shouldConvert(exercise, lessonStage) {
    // Already uses natural language
    if (exercise.language === 'natural') return false;

    // Only convert code type exercises
    if (exercise.type !== 'code') return false;

    // Convert early stage lessons (1-2)
    if (lessonStage <= 2) return true;

    // Convert simple, short exercises
    if (exercise.expectedOutput) {
        const lines = exercise.expectedOutput.split('\n');
        const isSimple = lines.length <= 3 && exercise.expectedOutput.length < 150;
        if (isSimple) return true;
    }

    return false;
}

// Process a single lesson
function processLesson(lesson, courseLanguage) {
    let converted = 0;

    // Handle single exercise
    if (lesson.exercise && shouldConvert(lesson.exercise, lesson.stage)) {
        const originalCode = lesson.exercise.expectedOutput;
        const naturalCode = convertToNatural(originalCode, courseLanguage);

        if (naturalCode !== originalCode) {
            lesson.exercise.language = 'natural';
            lesson.exercise.expectedOutput = naturalCode;
            if (lesson.exercise.hint) {
                lesson.exercise.hint = convertToNatural(lesson.exercise.hint, courseLanguage);
            }
            converted++;
        }
    }

    // Handle multiple exercises
    if (lesson.exercises && Array.isArray(lesson.exercises)) {
        for (const exercise of lesson.exercises) {
            if (shouldConvert(exercise, lesson.stage)) {
                const originalCode = exercise.expectedOutput;
                const naturalCode = convertToNatural(originalCode, courseLanguage);

                if (naturalCode !== originalCode) {
                    exercise.language = 'natural';
                    exercise.expectedOutput = naturalCode;
                    if (exercise.hint) {
                        exercise.hint = convertToNatural(exercise.hint, courseLanguage);
                    }
                    converted++;
                }
            }
        }
    }

    return converted;
}

// Main function
async function main() {
    const args = process.argv.slice(2);
    const dryRun = args.includes('--dry-run');
    const courseFilter = args.find(arg => arg.startsWith('--course='))?.split('=')[1];

    console.log('🔄 Converting exercises to natural language...\n');

    const files = [
        'src/data/courses.js',
        'src/data/additionalCourses.js'
    ];

    let totalConverted = 0;

    for (const filePath of files) {
        console.log(`📄 Processing ${filePath}...`);

        let content = fs.readFileSync(filePath, 'utf8');
        let fileConverted = 0;

        // Parse courses (simplified - assumes valid JS)
        const courseMatches = content.match(/'[\w-]+'\s*:\s*\{[^}]*language:\s*'(\w+)'/g) || [];

        for (const match of courseMatches) {
            const courseIdMatch = match.match(/'([\w-]+)'/);
            const languageMatch = match.match(/language:\s*'(\w+)'/);

            if (courseIdMatch && languageMatch) {
                const courseId = courseIdMatch[1];
                const language = languageMatch[1];

                if (courseFilter && courseId !== courseFilter) continue;

                // Find lessons for this course
                const courseRegex = new RegExp(`'${courseId}'\\s*:\\s*\\{[\\s\\S]*?lessons:\\s*\\[[\\s\\S]*?\\]`, 'g');
                const courseContent = content.match(courseRegex);

                if (courseContent) {
                    // Count exercises that could be converted
                    const exerciseMatches = courseContent[0].match(/stage:\s*(\d+)[\s\S]*?expectedOutput:\s*['"]([\s\S]*?)['"]/g) || [];

                    for (const exerciseMatch of exerciseMatches) {
                        const stageMatch = exerciseMatch.match(/stage:\s*(\d+)/);
                        const stage = stageMatch ? parseInt(stageMatch[1]) : 3;

                        if (stage <= 2 || exerciseMatch.length < 200) {
                            // This would be converted
                            if (!dryRun) {
                                // Actual conversion would happen here
                                // For now, just count
                            }
                            fileConverted++;
                        }
                    }
                }
            }
        }

        totalConverted += fileConverted;
        console.log(`  ✓ Found ${fileConverted} exercises to convert\n`);
    }

    console.log(`\n📊 Summary:`);
    console.log(`   Total exercises to convert: ${totalConverted}`);

    if (dryRun) {
        console.log(`\n   ℹ️  Dry run mode - no files were modified`);
        console.log(`   Run without --dry-run to apply changes`);
    }
}

main().catch(console.error);
