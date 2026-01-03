#!/usr/bin/env python3
"""
Convert code exercises to natural language format
Processes courses.js and additionalCourses.js
"""

import re
import sys

# Natural language conversion mappings
CONVERSIONS = {
    'python': {
        # Order matters - more specific patterns first
        r'print\((.*?)\)': r'display \1',
        r'input\((.*?)\)': r'get input \1',
        r'if (.*?):': r'if \1 then',
        r'elif (.*?):': r'else if \1 then',
        r'else:': r'else',
        r'for (.*?) in (.*?):': r'for each \1 in \2 do',
        r'while (.*?):': r'while \1 do',
        r'def (.*?)\((.*?)\):': r'create function \1 with \2',
        r'return (.*)': r'return \1',
        r'len\((.*?)\)': r'length of \1',
        r' == ': r' equals ',
        r' != ': r' not equals ',
        r' and ': r' and ',
        r' or ': r' or ',
        r'True': r'true',
        r'False': r'false',
    },
    'javascript': {
        r'console\.log\((.*?)\);?': r'display \1',
        r'alert\((.*?)\);?': r'show alert \1',
        r'prompt\((.*?)\);?': r'get input \1',
        r'if\s*\((.*?)\)\s*\{': r'if \1 then',
        r'else\s+if\s*\((.*?)\)\s*\{': r'else if \1 then',
        r'else\s*\{': r'else',
        r'\}': r'end',
        r'const\s+(.*?)\s*=': r'create constant \1 as',
        r'let\s+(.*?)\s*=': r'create variable \1 as',
        r'var\s+(.*?)\s*=': r'create variable \1 as',
        r'function\s+(.*?)\((.*?)\)\s*\{': r'create function \1 with \2',
        r'return\s+(.*?);?': r'return \1',
        r';': r'',
        r' === ': r' equals ',
        r' == ': r' equals ',
        r' !== ': r' not equals ',
        r' != ': r' not equals ',
        r' && ': r' and ',
        r' \|\| ': r' or ',
        r'true': r'true',
        r'false': r'false',
    },
    'java': {
        r'System\.out\.println\((.*?)\);?': r'display \1',
        r'System\.out\.print\((.*?)\);?': r'display \1',
        r'if\s*\((.*?)\)\s*\{': r'if \1 then',
        r'else\s+if\s*\((.*?)\)\s*\{': r'else if \1 then',
        r'else\s*\{': r'else',
        r'\}': r'end',
        r'int\s+(.*?)\s*=': r'create number \1 as',
        r'double\s+(.*?)\s*=': r'create decimal \1 as',
        r'String\s+(.*?)\s*=': r'create text \1 as',
        r'boolean\s+(.*?)\s*=': r'create boolean \1 as',
        r'return\s+(.*?);?': r'return \1',
        r';': r'',
        r'true': r'true',
        r'false': r'false',
    },
    'cpp': {
        r'std::cout\s*<<\s*(.*?)\s*<<\s*std::endl;?': r'display \1',
        r'std::cout\s*<<\s*(.*?);?': r'display \1',
        r'std::cin\s*>>\s*(.*?);?': r'get input into \1',
        r'if\s*\((.*?)\)\s*\{': r'if \1 then',
        r'else\s+if\s*\((.*?)\)\s*\{': r'else if \1 then',
        r'else\s*\{': r'else',
        r'\}': r'end',
        r'int\s+(.*?)\s*=': r'create number \1 as',
        r'string\s+(.*?)\s*=': r'create text \1 as',
        r'bool\s+(.*?)\s*=': r'create boolean \1 as',
        r'return\s+(.*?);?': r'return \1',
        r';': r'',
        r'true': r'true',
        r'false': r'false',
    }
}

def convert_to_natural(code, language):
    """Convert code to natural language"""
    if not code or not language or language == 'natural':
        return code
    
    mapping = CONVERSIONS.get(language, {})
    natural = code
    
    # Apply conversions
    for pattern, replacement in mapping.items():
        natural = re.sub(pattern, replacement, natural)
    
    # Clean up whitespace
    natural = re.sub(r'\s+', ' ', natural)
    natural = natural.strip()
    
    return natural

def should_convert(exercise_text, stage):
    """Determine if exercise should be converted to natural language"""
    # Check if already natural language
    if "'language': 'natural'" in exercise_text or '"language": "natural"' in exercise_text:
        return False
    
    # Check if it's a code exercise
    if "'type': 'code'" not in exercise_text and '"type": "code"' not in exercise_text:
        return False
    
    # Convert stage 1-2 lessons
    if stage <= 2:
        return True
    
    # Convert simple exercises (short expectedOutput)
    output_match = re.search(r"'expectedOutput':\s*'([^']{0,150})'", exercise_text)
    if output_match:
        return True
    
    output_match = re.search(r'"expectedOutput":\s*"([^"]{0,150})"', exercise_text)
    if output_match:
        return True
    
    return False

def process_file(filepath, dry_run=False):
    """Process a course file and convert exercises"""
    print(f"\n📄 Processing {filepath}...")
    
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    converted_count = 0
    
    # Find all courses with their language
    course_pattern = r"'([\w-]+)':\s*\{[^}]*?language:\s*'(\w+)'"
    courses = re.findall(course_pattern, content)
    
    print(f"   Found {len(courses)} courses")
    
    for course_id, course_lang in courses:
        if course_lang == 'natural' or course_lang not in CONVERSIONS:
            continue
        
        # Find stage and expectedOutput pairs
        exercise_pattern = rf"(stage:\s*(\d+)[\s\S]{{0,500}}?expectedOutput:\s*'([^']*?)')"
        
        for match in re.finditer(exercise_pattern, content):
            full_match = match.group(0)
            stage = int(match.group(2))
            expected_output = match.group(3)
            
            if should_convert(full_match, stage) and expected_output:
                # Convert to natural language
                natural_output = convert_to_natural(expected_output, course_lang)
                
                if natural_output != expected_output:
                    old_text = f"expectedOutput: '{expected_output}'"
                    
                    # Check if language property already exists nearby
                    if "'language':" in full_match or "language:" in full_match:
                        # Just update expectedOutput and ensure language is 'natural'
                        new_text = f"expectedOutput: '{natural_output}'"
                        content = content.replace(old_text, new_text, 1)
                        
                        # Find and update language property to 'natural'
                        lang_pattern = rf"(language:\s*')(\w+)('[\s\S]{{0,200}}?expectedOutput:\s*'{re.escape(natural_output)}')"
                        content = re.sub(lang_pattern, r"\1natural\3", content, count=1)
                    else:
                        # Add language property
                        new_text = f"language: 'natural',\n                    expectedOutput: '{natural_output}'"
                        content = content.replace(old_text, new_text, 1)
                    
                    converted_count += 1
    
    print(f"   ✓ Converted {converted_count} exercises")
    
    if not dry_run and converted_count > 0:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"   💾 Saved changes to {filepath}")
    
    return converted_count

def main():
    dry_run = '--dry-run' in sys.argv
    
    if dry_run:
        print("�� DRY RUN MODE - No files will be modified\n")
    else:
        print("🔄 Converting exercises to natural language...\n")
    
    files = [
        'src/data/courses.js',
        'src/data/additionalCourses.js'
    ]
    
    total_converted = 0
    
    for filepath in files:
        try:
            count = process_file(filepath, dry_run)
            total_converted += count
        except Exception as e:
            print(f"   ❌ Error processing {filepath}: {e}")
            import traceback
            traceback.print_exc()
    
    print(f"\n📊 Summary:")
    print(f"   Total exercises converted: {total_converted}")
    
    if dry_run:
        print(f"\n   ℹ️  Run without --dry-run to apply changes")

if __name__ == '__main__':
    main()
