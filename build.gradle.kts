import com.github.gradle.node.npm.task.NpmTask
import org.gradle.kotlin.dsl.assign
import org.gradle.kotlin.dsl.register


plugins {
    base
    `maven-publish`
    alias(libs.plugins.gitVersion)
    alias(libs.plugins.node)
}

version = computeVersion().also { println("Version: $it") }

fun computeVersion(): String {
    val versionFile = file("version.txt")
    return if (versionFile.exists()) {
        versionFile.readText().trim()
    } else {
        val gitVersion: groovy.lang.Closure<String> by extra
        gitVersion()
        .let {
            // Normalize the version so that is always a valid NPM version.
            if (it.matches("""\d+\.\d+.\d+-.*""".toRegex())) it else "0.0.1-$it"
        }
        .also { versionFile.writeText(it) }
    }
}

group = "org.modelix"

group = rootProject.group
version = rootProject.version
apply(plugin = "maven-publish")

repositories {
    maven { url = uri("https://artifacts.itemis.cloud/repository/maven-mps/") }
    mavenCentral()
    mavenLocal()
}

publishing {
    repositories {
        maven {
            name = "itemis"
            url =
                if (version.toString().contains("SNAPSHOT")) {
                    uri("https://artifacts.itemis.cloud/repository/maven-mps-snapshots/")
                } else {
                    uri("https://artifacts.itemis.cloud/repository/maven-mps-releases/")
                }
            credentials {
                username = project.findProperty("artifacts.itemis.cloud.user").toString()
                password = project.findProperty("artifacts.itemis.cloud.pw").toString()
            }
        }
    }
}

layout.buildDirectory.get().asFile.mkdirs()
val publicationFile = layout.buildDirectory.file("modelix-dashboard-${project.version}.tgz")

val updateVersionTask = tasks.register<NpmTask>("updatePackageVersion") {
    workingDir.set(layout.projectDirectory.asFile)
    npmCommand = listOf("version")
    args.set(listOf(
        project.version.toString(),
        "--allow-same-version",
        "--no-git-tag-version"
    ))
}

val npmPackTask =
    tasks.register<NpmTask>("npmPack") {
        group = "build"
        dependsOn(updateVersionTask)

        workingDir.set(layout.projectDirectory.asFile)
        npmCommand = listOf("pack")
        args.set(listOf(
            "--pack-destination=build"
        ))
    }

val npmPublishTask =
    tasks.register<NpmTask>("npmPublish") {
        group = "publishing"
        dependsOn(npmPackTask)

        inputs.file(publicationFile)

        npmCommand.set(listOf("publish"))
        args.set(
            listOf(
                publicationFile.get().asFile.absolutePath,
                "--registry=https://artifacts.itemis.cloud/repository/npm-open/",
                "--//artifacts.itemis.cloud/repository/npm-open/:_authToken=${project.findProperty(
                    "artifacts.itemis.cloud.npm.token",
                )}",
            ),
        )
    }

tasks.assemble {
    dependsOn(npmPackTask)
}

tasks.publish {
    dependsOn(npmPublishTask)
}