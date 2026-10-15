import { TutorialCourse } from '../types';

export const TUTORIAL_COURSES: TutorialCourse[] = [
  {
    id: 'cpp',
    language: 'C++',
    title: 'Modern C++: From Fundamentals to High Performance',
    description: 'Master systems programming, memory safety, pointers, RAII, and object-oriented architectures in modern C++.',
    level: 'Beginner',
    icon: 'Cpu',
    lessons: [
      {
        id: 'cpp_intro',
        title: 'Introduction to C++ & Compilation Pipeline',
        duration: '15 mins',
        description: 'Understand how C++ compiles into machine code, basic syntax, and standard I/O streams.',
        content: `C++ is a powerful, compiled, statically typed language developed by Bjarne Stroustrup. It provides direct hardware access and deterministic memory management.\n\n### The Compilation Model\n1. **Preprocessor (#include, #define)**: Expands macros and headers.\n2. **Compiler**: Translates C++ code into assembly.\n3. **Assembler**: Produces object files (.o / .obj).\n4. **Linker**: Combines object files and libraries into an executable.`,
        codeExample: `#include <iostream>
#include <string>

int main() {
    std::string platform = "ZAIN TECH";
    std::cout << "Welcome to " << platform << " C++ Academy!" << std::endl;
    
    int a = 42;
    int b = 58;
    std::cout << "Sum: " << (a + b) << std::endl;
    return 0;
}`,
        quiz: [
          {
            id: 'q_cpp_1',
            question: 'Which step in the C++ compilation pipeline brings together object files into an executable?',
            options: ['Preprocessor', 'Linker', 'Lexical Analyzer', 'Interpreter'],
            correctAnswer: 1,
            explanation: 'The Linker connects compiled object files and external libraries into the final binary.',
          },
          {
            id: 'q_cpp_2',
            question: 'What is the return type of the main function in standard C++?',
            options: ['void', 'int', 'bool', 'char*'],
            correctAnswer: 1,
            explanation: 'The main function returns an integer (0 indicating successful execution).',
          },
        ],
      },
      {
        id: 'cpp_pointers',
        title: 'Pointers, References & Smart Pointers (std::unique_ptr)',
        duration: '25 mins',
        description: 'Demystify raw memory addresses, reference semantics, and modern RAII memory safety.',
        content: `Pointers store memory addresses of variables. Modern C++ heavily favors smart pointers (\`std::unique_ptr\`, \`std::shared_ptr\`) to prevent memory leaks and dangling pointers automatically through RAII (Resource Acquisition Is Initialization).`,
        codeExample: `#include <iostream>
#include <memory>

struct SensorNode {
    int id;
    double telemetry;
};

int main() {
    // Modern smart pointer - automatically freed when out of scope
    auto node = std::make_unique<SensorNode>(SensorNode{101, 98.6});
    
    std::cout << "Sensor ID: " << node->id << ", Val: " << node->telemetry << std::endl;
    return 0;
}`,
        quiz: [
          {
            id: 'q_cpp_3',
            question: 'Why is std::unique_ptr preferred over raw pointers for owning resources?',
            options: [
              'It uses less RAM than raw pointers',
              'It automatically frees memory when leaving scope (RAII)',
              'It can be shared across multiple threads without locks',
              'It executes faster than raw pointers',
            ],
            correctAnswer: 1,
            explanation: 'std::unique_ptr has zero runtime overhead and prevents memory leaks through scope-based destruction.',
          },
        ],
      },
    ],
  },
  {
    id: 'python',
    language: 'Python',
    title: 'Python for AI, Data Structures & Automation',
    description: 'Learn clean pythonic code, list comprehensions, decorators, generators, and async programming.',
    level: 'Beginner',
    icon: 'Terminal',
    lessons: [
      {
        id: 'py_intro',
        title: 'Pythonic Fundamentals & Data Structures',
        duration: '12 mins',
        description: 'Explore dynamic typing, dictionaries, sets, tuples, and idiomatic Python syntax.',
        content: `Python is an expressive, high-level language designed for readability and rapid prototyping. In AI and machine learning, Python is the unquestioned gold standard.\n\n### Core Philosophy (Zen of Python)\n- Beautiful is better than ugly.\n- Explicit is better than implicit.\n- Simple is better than complex.`,
        codeExample: `# Python List Comprehension & Dictionary Mapping
models = ["gemini-3.8-flash", "gemini-4-argon", "veo-3.1"]

model_meta = {
    m: {"status": "active", "latency_ms": 120 if "flash" in m else 450}
    for m in models
}

for name, stats in model_meta.items():
    print(f"Model: {name:<20} | Status: {stats['status']} | Latency: {stats['latency_ms']}ms")`,
        quiz: [
          {
            id: 'q_py_1',
            question: 'Which of the following creates an immutable sequence in Python?',
            options: ['List []', 'Dictionary {}', 'Tuple ()', 'Set {}'],
            correctAnswer: 2,
            explanation: 'Tuples are immutable; once created, their elements cannot be reassigned or altered.',
          },
        ],
      },
      {
        id: 'py_async',
        title: 'Asynchronous Programming with asyncio',
        duration: '20 mins',
        description: 'Handle high-concurrency network requests, async generators, and event loops.',
        content: `Asyncio allows Python to run single-threaded cooperative multitasking. Instead of blocking during I/O operations (like calling AI APIs or querying databases), execution yields back to the event loop.`,
        codeExample: `import asyncio

async def fetch_ai_stream(prompt: str, delay: float):
    print(f"Starting request for: {prompt}")
    await asyncio.sleep(delay)
    return f"Response for {prompt} ready!"

async def main():
    results = await asyncio.gather(
        fetch_ai_stream("Summarize document", 1.0),
        fetch_ai_stream("Generate code", 0.5),
    )
    print("All tasks finished:", results)

asyncio.run(main())`,
        quiz: [
          {
            id: 'q_py_2',
            question: 'What keyword suspends execution of a coroutine until an awaitable completes?',
            options: ['yield', 'await', 'async', 'defer'],
            correctAnswer: 1,
            explanation: 'The `await` keyword yields execution back to the event loop until the awaited task completes.',
          },
        ],
      },
    ],
  },
  {
    id: 'javascript',
    language: 'JavaScript',
    title: 'Modern JavaScript & TypeScript Architecture',
    description: 'Master ES6+, closures, the event loop, Promises, TypeScript types, and reactive state management.',
    level: 'Beginner',
    icon: 'FileCode',
    lessons: [
      {
        id: 'js_event_loop',
        title: 'The JavaScript Event Loop & Microtasks',
        duration: '18 mins',
        description: 'Understand the Call Stack, Web APIs, Task Queue, and Microtask Queue.',
        content: `JavaScript is single-threaded with a non-blocking asynchronous event loop. Understanding how microtasks (Promises, queueMicrotask) execute before macrotasks (setTimeout, setInterval) is critical for high-performance frontends.`,
        codeExample: `console.log("1: Synchronous start");

setTimeout(() => {
  console.log("4: Macrotask (setTimeout)");
}, 0);

Promise.resolve().then(() => {
  console.log("3: Microtask (Promise.then)");
});

console.log("2: Synchronous end");
// Output order: 1 -> 2 -> 3 -> 4`,
        quiz: [
          {
            id: 'q_js_1',
            question: 'Between a Promise microtask and a setTimeout macrotask queued at the same time, which executes first?',
            options: ['setTimeout', 'Promise microtask', 'Random based on CPU load', 'Both simultaneously on worker threads'],
            correctAnswer: 1,
            explanation: 'The event loop processes all pending microtasks before executing the next macrotask.',
          },
        ],
      },
    ],
  },
  {
    id: 'html_css',
    language: 'HTML',
    title: 'Modern Semantic HTML5 & Modern CSS3 / Tailwind',
    description: 'Learn modern semantic tags, accessibility (a11y), CSS Grid, Flexbox, glassmorphism, and responsive layouts.',
    level: 'Beginner',
    icon: 'Layout',
    lessons: [
      {
        id: 'html_semantic',
        title: 'Accessible Semantic HTML & Modern CSS Grid',
        duration: '15 mins',
        description: 'Build robust, screen-reader friendly layouts with zero div-soup.',
        content: `Semantic HTML elements convey meaning to both the browser and assistive devices. Combined with CSS Grid and Flexbox, modern layouts require far less markup than legacy frameworks.`,
        codeExample: `<article class="card p-6 rounded-2xl bg-slate-900/80 border border-indigo-500/30 backdrop-blur-md">
  <header class="flex items-center justify-between mb-4">
    <h2 class="text-xl font-bold text-white">Neural Hub</h2>
    <span class="px-2 py-1 text-xs font-semibold text-cyan-400 bg-cyan-950/60 rounded-full border border-cyan-800">
      Online
    </span>
  </header>
  <p class="text-slate-300 text-sm leading-relaxed">
    Next-generation AI orchestration platform with zero-latency inference.
  </p>
</article>`,
        quiz: [
          {
            id: 'q_html_1',
            question: 'Which tag should be used to wrap autonomous, self-contained content in an HTML document?',
            options: ['<div>', '<article>', '<aside>', '<section>'],
            correctAnswer: 1,
            explanation: '<article> represents an independent, self-contained piece of content like a blog post or product card.',
          },
        ],
      },
    ],
  },
  {
    id: 'sql',
    language: 'SQL',
    title: 'Relational Database Architecture & PostgreSQL Queries',
    description: 'Master SELECT queries, joins, indexes, transactions (ACID), window functions, and schema design.',
    level: 'Intermediate',
    icon: 'Database',
    lessons: [
      {
        id: 'sql_joins',
        title: 'Mastering SQL Joins & Aggregate Performance',
        duration: '20 mins',
        description: 'Deep dive into INNER, LEFT, RIGHT, and FULL OUTER joins, indexing, and GROUP BY clauses.',
        content: `SQL (Structured Query Language) is the backbone of relational data persistence. PostgreSQL offers advanced capabilities such as JSONB columns, window functions, and B-Tree indexing.`,
        codeExample: `-- Query user activity with aggregate conversation counts
SELECT 
  u.id,
  u.name,
  u.email,
  COUNT(c.id) AS total_conversations,
  MAX(c.updated_at) AS last_active_at
FROM users u
LEFT JOIN conversations c ON u.id = c.user_id
WHERE u.created_at >= NOW() - INTERVAL '30 days'
GROUP BY u.id, u.name, u.email
HAVING COUNT(c.id) > 0
ORDER BY total_conversations DESC
LIMIT 10;`,
        quiz: [
          {
            id: 'q_sql_1',
            question: 'Which join type returns all records from the left table, and matching records from the right table?',
            options: ['INNER JOIN', 'LEFT OUTER JOIN', 'CROSS JOIN', 'RIGHT OUTER JOIN'],
            correctAnswer: 1,
            explanation: 'LEFT JOIN returns all rows from the left table even if no matches exist in the right table (NULL filled).',
          },
        ],
      },
    ],
  },
  {
    id: 'java',
    language: 'Java',
    title: 'Enterprise Java: OOP, Concurrency & Spring Architecture',
    description: 'Learn modern Java 21 features, virtual threads (Project Loom), JVM memory model, and enterprise design patterns.',
    level: 'Intermediate',
    icon: 'Coffee',
    lessons: [
      {
        id: 'java_virtual_threads',
        title: 'Java 21 Virtual Threads & Modern Concurrency',
        duration: '22 mins',
        description: 'Explore lightweight virtual threads that dramatically simplify high-throughput I/O servers.',
        content: `Virtual threads in Java 21 decouple Java threads from OS threads, allowing millions of concurrent tasks to execute simultaneously without thread pool exhaustion.`,
        codeExample: `import java.util.concurrent.Executors;

public class ZainWorker {
    public static void main(String[] args) {
        try (var executor = Executors.newVirtualThreadPerTaskExecutor()) {
            for (int i = 0; i < 10_000; i++) {
                final int taskId = i;
                executor.submit(() -> {
                    // Simulating lightweight non-blocking work
                    System.out.println("Processing AI Task #" + taskId + " on " + Thread.currentThread());
                });
            }
        } // Automatically waits for all tasks to complete
    }
}`,
        quiz: [
          {
            id: 'q_java_1',
            question: 'What is the main advantage of Java 21 Virtual Threads over traditional platform threads?',
            options: [
              'Virtual threads execute native C code without JNI',
              'Millions of virtual threads can be spawned with negligible memory and OS overhead',
              'Virtual threads eliminate the need for garbage collection',
              'They bypass the Java SecurityManager',
            ],
            correctAnswer: 1,
            explanation: 'Virtual threads are managed by the JVM rather than the OS, allowing millions of lightweight threads.',
          },
        ],
      },
    ],
  },
];
